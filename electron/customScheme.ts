import { extname, join } from 'path'
import { createReadStream } from 'fs'
import { protocol } from 'electron'

const privileges = {
  standard: true,
  supportFetchAPI: true,
  bypassCSP: true,
  corsEnabled: true,
  stream: true,
}
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges }])

export class CustomScheme {
  private static getMimeType(extension: string) {
    switch (extension) {
      case 'js':
        return 'text/javascript'
      case '.html':
        return 'text/html'
      case '.css':
        return 'text/css'
      case '.svg':
        return 'image/svg+xml'
      case '.json':
        return 'application/json'
      default:
        return ''
    }
  }

  static registerScheme() {
    protocol.registerStreamProtocol('app', (request, callback) => {
      let pathName = new URL(request.url).pathname
      let extension = extname(pathName).toLowerCase()

      if (extension === '') {
        pathName = 'index.html'
        extension = '.html'
      }
      const tarFile = join(__dirname, pathName)
      callback({
        statusCode: 200,
        headers: { 'content-type': this.getMimeType(extension) },
        data: createReadStream(tarFile),
      })
    })
  }
}
