import { defineConfig } from 'vite-plus/pack'

export default defineConfig([
  {
    entry: {
      config: 'src/node/config.ts',
      composables: 'src/node/composables/index.ts'
    },
    outDir: 'dist/.pack',
    platform: 'node',
    dts: true,
    format: 'esm',
    // Clean is fine here: this is a staging dir. Consumers must never read it.
    // scripts/publish-node.mjs copies the finished output into dist/node with
    // per-file atomic renames, so the demo's VitePress server never sees a
    // file mid-rebuild.
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
