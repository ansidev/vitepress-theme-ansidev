import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'

// Resolve through node_modules rather than hardcoding a relative bin path so
// pnpm's workspace layout can hoist/structure the package freely. The bin
// file itself is not exported, so resolve the package.json and walk up to it.
const require = createRequire(import.meta.url)
const vitepressDir = dirname(
  require.resolve('vitepress/package.json', {
    paths: [process.cwd()]
  })
)
const vitepressBin = join(vitepressDir, 'bin', 'vitepress.js')

const child = spawn(process.execPath, [vitepressBin, 'dev'], {
  stdio: 'inherit'
})

// Prevent the wrapper from being interrupted.
// The child still receives terminal SIGINT.
process.on('SIGINT', () => {})

child.on('exit', (code, signal) => {
  const interrupted = signal === 'SIGINT' || code === 130

  process.exit(interrupted ? 0 : (code ?? 1))
})
