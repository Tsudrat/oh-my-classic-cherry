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

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'built-in/plugins/index': 'src/core/plugins/built-in/index.ts',
    'provider/index': 'src/core/providers/index.ts'
  },
  outDir: 'dist',
  format: ['esm', 'cjs'],
  clean: true,
  dts: { tsgo: { path: tsrsBin } },
  tsconfig: 'tsconfig.json'
})
