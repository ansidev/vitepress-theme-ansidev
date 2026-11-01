// The demo's VitePress dev server resolves `@ansidev-oss/vitepress-theme-ansidev`
// from packages/theme/dist. `vp pack --watch` cleans dist/node before each
// rebuild, so a demo start racing the first watch build fails with
// UNRESOLVED_IMPORT. Touching a watched file after each successful pack build
// makes Vite restart/re-resolve once the output is complete.
import fs from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const demoVitepressDir = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../packages/demo/.vitepress'
)

const marker = resolve(demoVitepressDir, '.theme-rebuild')
fs.writeFileSync(marker, '')
const now = new Date()
fs.utimesSync(marker, now, now)
