import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  build: {
    outDir: 'dist/client/vitepress',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        theme: fileURLToPath(new URL('./src/client/vitepress/styles/index.css', import.meta.url))
      },
      output: {
        assetFileNames: 'styles/[name][extname]'
      }
    }
  }
})
