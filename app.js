// app.js

'use strict';

var http = require( 'http'),
    express = require( 'express'),
    socket = require('socket.io'),
    electron = require( 'electron' ),
    BrowserWindow = electron.BrowserWindow,

    app = express(),
    eleApp = electron.app,
    server = http.createServer( app ),
    io = socket.listen( server ),

    mainWin = null,
    urlIndex = `file://${__dirname}/call.html`
;




app.use( express.static( __dirname + '/' ));

app.get( '/', function ( req, res ) {
    res.redirect( 'index.html' );
});

eleApp.on( 'window-all-closed', function() {
    eleApp.quit();
});

eleApp.on( 'ready', function() {
    mainWin = new BrowserWindow({
        webPreferences: { nodeIntegration: true },
        width: 300,
        height: 300
    });
});


io.of('/')
  .on('connection', function ( socket ) {
      socket.on( 'call', function ( msg ) {
          mainWin.loadURL( urlIndex );
      });
  });

server.listen( 3000 );
console.log(
    'Server listening on port %d.',
    server.address().port
);
