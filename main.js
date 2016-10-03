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

  if (process.platform === 'darwin') {
    const name = app.getName()
    const template = [
      {
        label: 'Edit',
        submenu: [
          {
            role: 'undo'
          },
          {
            role: 'redo'
          },
          {
            type: 'separator'
          },
          {
            role: 'cut'
          },
          {
            role: 'copy'
          },
          {
            role: 'paste'
          },
          {
            role: 'pasteandmatchstyle'
          },
          {
            role: 'delete'
          },
          {
            role: 'selectall'
          }
        ]
      },
      {
        role: 'window',
        submenu: [
          {
            role: 'minimize'
          },
          {
            role: 'close'
          }
        ]
      }
    ]

    template.unshift({
      label: name,
      submenu: [
        {
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          role: 'hide'
        },
        {
          role: 'hideothers'
        },
        {
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          role: 'quit'
        }
      ]
    })

    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  }
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
