import { spawn } from 'node:child_process'

const child = spawn(
  process.execPath,
  ['./node_modules/vitepress/bin/vitepress.js', 'dev'],
  { stdio: 'inherit' }
)

// Prevent the wrapper from being interrupted.
// The child still receives terminal SIGINT.
process.on('SIGINT', () => {})

child.on('exit', (code, signal) => {
  const interrupted = signal === 'SIGINT' || code === 130

  process.exit(interrupted ? 0 : (code ?? 1))
})
