import { defineConfig } from 'vite-plus/pack'

export default defineConfig([
  {
    entry: {
      config: 'src/node/config.ts',
      composables: 'src/node/composables/index.ts'
    },
    outDir: 'dist/node',
    platform: 'node',
    dts: true,
    format: 'esm',
    clean: true,
    tsconfig: 'tsconfig.node.json',
    deps: {
      neverBundle: [
        'glob',
        'kind-of',
        'is-extendable',
        'extend-shallow',
        'section-matter',
        'js-yaml',
        'esprima',
        'gray-matter',
        'strip-bom-string'
      ]
    }
  }
])
