import { createRequire } from 'node:module'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

import { defineConfig } from 'tsdown'

// rolldown-plugin-dts spawns this path directly, so use tsrs' native binary rather than its Node launcher
const tsrsPackageDir = path.dirname(createRequire(import.meta.url).resolve('tsrs/package.json'))
const { default: resolveTsrsBinary } = await import(
  pathToFileURL(path.join(tsrsPackageDir, 'lib', 'getExePath.js')).href
)
const tsrsBin = resolveTsrsBinary()

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
