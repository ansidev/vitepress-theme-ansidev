import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: {
      config: 'src/node/config.ts',
      composables: 'src/node/composables/index.ts',
    },
    outDir: 'dist/node',
    platform: 'node',
    dts: true,
    format: 'esm',
    clean: true,
    tsconfig: 'tsconfig.node.json',
  },
])
