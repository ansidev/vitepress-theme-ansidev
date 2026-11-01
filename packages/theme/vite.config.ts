import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig, lazyPlugins } from 'vite-plus'
import tsdownConfig from './tsdown.config.js'

export default defineConfig({
  run: {
    tasks: {
      'dev:client': {
        command: 'vp build --watch',
        cache: false
      },
      'dev:all': {
        command: 'vp run --parallel dev:client dev:node',
        cache: false
      },
      'build:all': {
        command:
          'rimraf dist && vp build && vp exec tsc --emitDeclarationOnly && vp pack && node ../../scripts/publish-node.mjs',
        cache: false
      },
      'dev:node': {
        command:
          'vp pack --watch --on-success "node ../../scripts/publish-node.mjs && node ../../scripts/touch-demo.mjs"',
        cache: false
      },
      'build:client': {
        command: 'vp build'
      },
      'build:types': {
        command: 'vp exec tsc --emitDeclarationOnly'
      },
      'build:node': {
        command: 'vp pack && node ../../scripts/publish-node.mjs'
      }
    }
  },
  pack: tsdownConfig,
  plugins: lazyPlugins(() => [vue(), tailwindcss()]),
  build: {
    lib: {
      entry: {
        index: resolve(import.meta.dirname, 'src/client/index.ts')
      },
      formats: ['es'],
      fileName: (_, entryName) => `${entryName}.js`
    },
    rollupOptions: {
      external: [
        'tailwindcss',
        'vue',
        'vitepress',
        /^vitepress\//,
        '@iconify/vue',
        '@localSearchIndex',
        '@tailwindcss/vite',
        '@vitepress/client',
        '@vitepress/shared',
        '@siteData'
      ],
      output: {
        globals: {
          vue: 'Vue',
          vitepress: 'VitePress'
        },
        assetFileNames: 'styles.css'
      }
    },
    outDir: 'dist/client',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src')
    }
  }
})
