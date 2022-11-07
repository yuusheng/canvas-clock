export function buildEntry(mode: 'development' | 'production') {
  require('esbuild').buildSync({
    entryPoints: ['./electron/mainEntry.ts'],
    bundle: true,
    platform: 'node',
    minify: mode === 'production' ? true : false,
    outfile: './dist/mainEntry.js',
    external: ['electron'],
  })
}