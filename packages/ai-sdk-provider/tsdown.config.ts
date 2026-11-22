import { createRequire } from 'node:module'
import path from 'node:path'

import { defineConfig } from 'tsdown'

// rolldown-plugin-dts' tsgo backend accepts any tsc-compatible binary; use tsrs
const tsrsBin = path.join(path.dirname(createRequire(import.meta.url).resolve('tsrs/package.json')), 'bin', 'tsrs')

export default defineConfig({
  entry: {
    index: 'src/index.ts'
  },
  outDir: 'dist',
  format: ['esm', 'cjs'],
  clean: true,
  dts: { tsgo: { path: tsrsBin } },
  tsconfig: 'tsconfig.json'
})
