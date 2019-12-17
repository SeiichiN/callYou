// main.js

'use strict'

const electron = require('electron')
const app = electron.app
const ipcMain = electron.ipcMain

const nodeStatic = require('node-static')
const file = new nodeStatic.Server(__dirname + '/public')

const http = require('http')

const BrowserWindow = electron.BrowserWindow

const socket = require('socket.io')

let mainWindow = null

const server = http.createServer( function (request, response) {
  request.addListener( 'end', function() {
    file.serve(request, response)
  }).resume()
})

const io = socket.listen(server)

io.of('/')
                 .on('connection', function ( socket ) {
                   socket.on( 'call', function (msg) {
                     console.log(msg)
                     mainWindow.webContents.send('async-call', msg)
                   })
})

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit()
  }
})

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width:800,
    height:600,
    webPreferences : {
      nodeIntegration: true
    }
  })
  mainWindow.loadURL('http://localhost:8888/call.html')

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})

server.listen(8888)
console.log(
  'Server listening on port %d', server.address().port
)

// Electronでプロセス間通信(ipc) MainProcessからRendererProcessへ非同期通信
// https://gist.github.com/KimuraTakaumi/9f184167f321d8f618ec
