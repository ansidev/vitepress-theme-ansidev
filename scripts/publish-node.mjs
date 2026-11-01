// Publishes packages/theme/dist/.pack/* -> packages/theme/dist/node/* using
// per-file copy-to-temp + rename, which is atomic on POSIX. `vp pack --watch`
// wipes its outDir at the start of every rebuild (rolldown watch behavior,
// not disableable via `clean: false`), so the demo's VitePress server —
// which imports `@ansidev-oss/vitepress-theme-ansidev/composables` natively
// from dist/node while loading `.paths.ts` files — must never observe the
// raw pack output. It reads dist/node instead, where files only ever swap
// atomically.
import { copyFileSync, mkdirSync, readdirSync, renameSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const themeDir = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../packages/theme'
)
const src = resolve(themeDir, 'dist/.pack')
const dest = resolve(themeDir, 'dist/node')

mkdirSync(dest, { recursive: true })

for (const file of readdirSync(src)) {
  const tmp = resolve(dest, `.${file}.tmp`)
  copyFileSync(resolve(src, file), tmp)
  renameSync(tmp, resolve(dest, file))
}

console.log(`[publish-node] published ${src} -> ${dest}`)
