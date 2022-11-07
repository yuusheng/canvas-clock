import type { BrowserWindowConstructorOptions } from 'electron'
import { BrowserWindow, app } from 'electron'
import { CustomScheme } from './customScheme'
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

let mainWindow: BrowserWindow

app.whenReady().then(() => {
  const config: BrowserWindowConstructorOptions = {
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      contextIsolation: false,
      webviewTag: true,
      spellcheck: false,
      disableHtmlFullscreenWindowResize: true,
    },
  }
  mainWindow = new BrowserWindow(config)
  mainWindow.webContents.openDevTools({ mode: 'undocked' })
  if (process.argv[2]) {
    mainWindow.loadURL(process.argv[2])
  }
  else {
    CustomScheme.registerScheme()
    mainWindow.loadURL('app://index.html')
  }
})
