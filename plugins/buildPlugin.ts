import { mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { CliOptions } from 'electron-builder'
import { buildEntry } from './common'

export function buildPlugin() {
  return {
    name: 'build-plugin',
    closeBundle() {
      const buildObj = new BuildObj()
      buildObj.buildMain()
      buildObj.preparePackageJson()
      buildObj.buildInstaller()
    },
  }
}

class BuildObj {
  buildMain() {
    buildEntry('production')
  }

  async preparePackageJson() {
    const pkgJsonPath = join(process.cwd(), 'package.json')
    const localPkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'))

    const electronConfig = localPkgJson.devDependencies.electron.replace('^', '')
    localPkgJson.main = 'mainEntry.js'
    delete localPkgJson.scripts
    delete localPkgJson.devDependencies
    delete localPkgJson.eslintConfig
    localPkgJson.devDependencies = { electron: electronConfig }

    const tarJsonPath = join(process.cwd(), 'dist', 'package.json')
    writeFileSync(tarJsonPath, JSON.stringify(localPkgJson))
    mkdirSync(join(process.cwd(), 'dist/node_modules'))
  }

  async buildInstaller() {
    const options: CliOptions = {
      config: {
        directories: {
          output: join(process.cwd(), 'release'),
          app: join(process.cwd(), 'dist'),
        },
        files: ['**'],
        extends: null,
        productName: 'electron',
        appId: 'com.yuusheng.desktop',
        asar: true,
        nsis: {
          oneClick: true,
          perMachine: true,
          allowToChangeInstallationDirectory: false,
          createDesktopShortcut: true,
          createStartMenuShortcut: true,
          shortcutName: 'electron-app',
        },
        publish: [{ provider: 'generic', url: 'http://localhost:5500/' }],
      },
      projectDir: process.cwd(),
    }
    return (await import('electron-builder')).build(options)
  }
}
