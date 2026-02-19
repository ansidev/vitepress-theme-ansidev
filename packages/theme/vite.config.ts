import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/client/index.ts'),
      },
      formats: ['es'],
      fileName: (_, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: [
        'tailwindcss',
        'vue',
        'vitepress',
        '@iconify/vue',
        '@localSearchIndex',
        '@tailwindcss/vite',
        '@vitepress/client',
        '@vitepress/shared',
        '@siteData',
      ],
      output: {
        globals: {
          vue: 'Vue',
          vitepress: 'VitePress',
        },
        assetFileNames: 'styles.css',
      },
    },
    outDir: 'dist/client',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
