// main.js

'use strict';

var electron = require( 'electron' ),
    appExpress = require('./app'),
    socket = require('socket.io'),
    app = electron.app,
    io = socket.listen( app ),

    BrowserWindow = electron.BrowserWindow,
    urlIndex = `file://${__dirname}/call.html`,

    mainWindow;

app.on( 'window-all-closed', function () {
  if ( process.platform != 'darwin' ) {
    app.quit();
  }
});

app.on( 'ready', function () {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL( 'http://127.0.0.1:3000' );

  mainWindow.on( 'closed', function () {
    mainWindow = null;
  });
});

io.of('/')
  .on('connection', function ( socket ) {
    socket.on( 'call', function ( msg ) {
      mainWindow.loadURL( urlIndex );
      });
  });
