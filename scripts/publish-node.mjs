// Publishes packages/theme/dist/.pack/* -> packages/theme/dist/node/* using
// per-file copy-to-temp + rename, which is atomic on POSIX. `vp pack --watch`
// wipes its outDir at the start of every rebuild (rolldown watch behavior,
// not disableable via `clean: false`), so the demo's VitePress server —
// which imports `@ansidev-oss/vitepress-theme-ansidev/composables` natively
// from dist/node while loading `.paths.ts` files — must never observe the
// raw pack output. It reads dist/node instead, where files only ever swap
// atomically.
import {
  copyFileSync,
  mkdirSync,
  readdirSync,
  renameSync,
  rmSync
} from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const themeDir = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../packages/theme'
)
const src = resolve(themeDir, 'dist/.pack')
const dest = resolve(themeDir, 'dist/node')

mkdirSync(dest, { recursive: true })

// Files are swapped individually, so a reader racing a publish can briefly
// observe a mix of old and new files. Per-file atomicity is enough here: the
// reader either gets the previous or the next version of each module.
const published = new Set()
for (const file of readdirSync(src)) {
  published.add(file)
  const tmp = resolve(dest, `.${file}.tmp`)
  copyFileSync(resolve(src, file), tmp)
  renameSync(tmp, resolve(dest, file))
}

// Prune outputs that no longer exist in the pack so deleted/renamed modules
// don't accumulate in dist/node and leak into the published npm package
// (`files: ["dist"]` ships this whole directory).
// Renames are not atomic across the set, so move stale entries out first.
// Only pack-shaped outputs (.mjs/.d.mts) are pruned: `vp exec tsc
// --emitDeclarationOnly` also lands declarations (config.d.ts,
// composables/*.d.ts) in dist/node as part of build:all, matching the 1.1.0
// published package, and those must survive this step.
const stale = readdirSync(dest).filter(
  (file) =>
    !file.endsWith('.tmp') &&
    !published.has(file) &&
    (file.endsWith('.mjs') || file.endsWith('.d.mts'))
)
if (stale.length > 0) {
  const trash = resolve(themeDir, 'dist/.stale-node')
  mkdirSync(trash, { recursive: true })
  for (const file of stale) {
    renameSync(resolve(dest, file), resolve(trash, file))
  }
  rmSync(trash, { recursive: true, force: true })
  console.log(`[publish-node] pruned stale outputs: ${stale.join(', ')}`)
}

console.log(`[publish-node] published ${src} -> ${dest}`)
