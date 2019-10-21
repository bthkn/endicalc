const { app, BrowserWindow } = require('electron')


let win // important


function createWindow () {

  win = new BrowserWindow({
    width: 1020,
    height: 580,
    center: true,
    resizable: false,
    maximizable: false,
    autoHideMenuBar: true,
    backgroundColor: '#f7f7f7',
    // frame: false,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: true
    },
    // icon: '/favicon.ico'
  }) 
 
  win.loadFile('src/index.html') // 'src/vizit.html'

  // win.webContents.openDevTools()
  
  win.on('closed', () => {
    win = null
  })
}


app.on('ready', createWindow)

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