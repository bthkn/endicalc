const { app, BrowserWindow, globalShortcut } = require('electron')


let win // important

function createWindow () {

  win = new BrowserWindow({
    width: 1000,
    height: 580,
    center: true,
    resizable: false,
    maximizable: false,
    autoHideMenuBar: true,
    backgroundColor: '#f7f7f7',
    frame: false,
    thickFrame: false,
    webPreferences: {
      // devTools: false,
      nodeIntegration: true,
      allowRunningInsecureContent: true
    },
    icon: 'src/img/icon.png'
  }) 
 
  win.loadFile('src/index.html') // ver index

  // win.webContents.openDevTools()

  win.once('ready-to-show', () => {
    win.show()
  })
  
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', () => {
  createWindow()
  // globalShortcut.register('CommandOrControl+V', () => {
  //   win.loadFile('src/ver.html')
  // })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})