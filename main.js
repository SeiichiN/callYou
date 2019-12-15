// main.js

'use strict'

const electron = require('electron')
// const appExpress = require('./app')

const app = electron.app

cont BrowserWindow = electron.BrowserWindow

let mainWindow

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit()
  }
})

app.on('ready', () => {
  mainWindow = new BrowserWindow({width:800, height:600})
  mainWindow.loadURL('http://127.0.0.1:8888')

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})
