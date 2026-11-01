// `pnpm demo:dev` loads the theme's node entrypoints (config, composables)
// from packages/theme/dist. Without a prior `pnpm theme:build`, dist/node is
// missing and VitePress dies with ERR_MODULE_NOT_FOUND before the dev server
// starts. Build the theme once when the built output is absent so the demo
// dev script works standalone.
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const nodeEntry = resolve(root, 'packages/theme/dist/node/composables.mjs')

if (!fs.existsSync(nodeEntry)) {
  console.log('[ensure-theme-built] theme dist missing, building theme...')
  const result = spawnSync('pnpm', ['theme:build'], {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  })
  if (result.status !== 0) {
    console.error('[ensure-theme-built] theme build failed')
    process.exit(result.status ?? 1)
  }
  if (!fs.existsSync(nodeEntry)) {
    console.error(`[ensure-theme-built] ${nodeEntry} still missing after build`)
    process.exit(1)
  }
}
