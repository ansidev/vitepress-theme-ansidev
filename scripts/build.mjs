import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { execSync } from 'node:child_process'

rmSync('dist', { recursive: true, force: true })
mkdirSync('dist', { recursive: true })

execSync('tsc -p tsconfig.build.json', { stdio: 'inherit' })
execSync('vite build --config vite.theme.config.ts', { stdio: 'inherit' })

const copies = [
  ['src/client/vitepress/components', 'dist/client/vitepress/components'],
  ['src/client/vitepress/pages', 'dist/client/vitepress/pages'],
  ['src/client/vitepress/plugins', 'dist/client/vitepress/plugins'],
  ['src/client/vitepress/styles', 'dist/client/vitepress/styles'],
  ['src/core/locales', 'dist/core/locales']
]

for (const [from, to] of copies) {
  if (existsSync(from)) {
    cpSync(from, to, { recursive: true })
  }
}
