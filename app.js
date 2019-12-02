// app.js

'use strict';

var http = require( 'http'),
    express = require( 'express'),
    socketIo = require('socket.io'),

    app = express(),
    server = http.createServer( app ),
    io = socketIo.listen( server )
;

io.on('call', function(msg) {
    console.log(msg);
    
});

app.use( express.static( __dirname + '/' ));

app.get( '/', function ( req, res ) {
    res.redirect( 'index.html' );
});

server.listen( 3000 );
console.log(
    'Server listening on port %d.',
    server.address().port
);
