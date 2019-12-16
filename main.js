// main.js

'use strict'

const electron = require('electron')
const app = electron.app

const nodeStatic = require('node-static')
const file = new nodeStatic.Server(__dirname)

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
                   })
})

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit()
  }
})

app.on('ready', () => {
  mainWindow = new BrowserWindow({width:800, height:600})
  mainWindow.loadURL('http://localhost:8888/index.html')

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})

server.listen(8888)
console.log(
  'Server listening on port %d', server.address().port
)
