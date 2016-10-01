const electron = require('electron')
const Shortcut = require('electron-shortcut')
const config = require('./config')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

const devUrl = `http://127.0.0.1:${config.port}`
const proUrl = `file://${__dirname}/app/index.html`

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: config.width, height: config.height})
  
  mainWindow.loadURL(process.env.NODE_ENV === 'develop' ? devUrl : proUrl)

  mainWindow.setMenuBarVisibility(false)  

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
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
