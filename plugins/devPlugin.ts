import type { ViteDevServer } from 'vite'
import { buildEntry } from './common'

export function devPlugin() {
  return {
    name: 'dev-plugin',
    configureServer(server: ViteDevServer) {
      buildEntry('development')

      server.httpServer?.once('listening', () => {
        const { spawn } = require('child_process')
        const addressInfo: any = server.httpServer?.address()
        const httpAddress = `http://localhost:${addressInfo.port}`
        const electronProcess = spawn(require('electron').toString(), ['./dist/mainEntry.js', httpAddress], {
          cwd: process.cwd(),
          stdio: 'inherit',
        })
        electronProcess.on('close', () => {
          server.close()
          process.exit()
        })
      })
    },
  }
}

export function getReplacer() {
  const externalModels = ['os', 'fs', 'path', 'events', 'child_process', 'crypto', 'http', 'buffer', 'url', 'better-sqlite3', 'knex']
  const result: any = {}
  for (const item of externalModels) {
    result[item] = () => ({
      find: new RegExp(`^${item}$`),
      code: `const ${item} = require('${item}');export { ${item} as default }`,
    })
  }
  result.electron = () => {
    const electronModules = ['clipboard', 'ipcRenderer', 'nativeImage', 'shell', 'webFrame'].join(',')
    return {
      find: /^electron$/,
      code: `const {${electronModules}} = require('electron');export {${electronModules}}`,
    }
  }
  return result
}
