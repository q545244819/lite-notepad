const { app, BrowserWindow, ipcMain, protocol, Menu } = require('electron')
const config = require('./config')

const devUrl = `http://127.0.0.1:${config.port}`
const proUrl = `file://${__dirname}/app/index.html`

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: config.width,
    height: config.height,
    minWidth: config.width,
    minHeight: config.height,
  })

  mainWindow.loadURL(process.env.NODE_ENV === 'develop' ? devUrl : proUrl)

  process.env.NODE_ENV !== 'develop' ? mainWindow.setMenu(null) : ''
  mainWindow.setHasShadow(true)

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  ipcMain.on('openDevTools', () => mainWindow.webContents.openDevTools())
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
