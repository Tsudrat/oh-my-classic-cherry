import { createRequire } from 'node:module'
import path from 'node:path'

import { defineConfig } from 'tsdown'

// rolldown-plugin-dts' tsgo backend accepts any tsc-compatible binary; use tsrs
const tsrsBin = path.join(path.dirname(createRequire(import.meta.url).resolve('tsrs/package.json')), 'bin', 'tsrs')

export default defineConfig(
  [
    'src/table/index.ts',
    'src/cell/index.ts',
    'src/header/index.ts',
    'src/kit/index.ts',
    'src/row/index.ts',
    'src/index.ts'
  ].map((entry) => ({
    entry: [entry],
    outDir: `dist${entry.replace('src', '').split('/').slice(0, -1).join('/')}`,
    dts: { tsgo: { path: tsrsBin } },
    sourcemap: true,
    format: ['esm' as const, 'cjs' as const],
    external: [/^[^./]/]
  }))
)
