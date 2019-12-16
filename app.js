// app.js
// https://github.com/zacanger/alert-node#readme

'use strict';

var http = require( 'http'),
    express = require( 'express'),
    socket = require('socket.io'),

    app = express(),
    server = http.createServer( app ),
    io = socket.listen( server ),

    window = new Window()
;


app.use( express.static( __dirname + '/' ));

app.get( '/', function ( req, res ) {
    res.redirect( 'index.html' );
});

io.of('/')
  .on('connection', function ( socket ) {
    socket.on( 'call', function ( msg ) {
        console.log('get call!');
        console.log( msg );
        alert( msg );
    })
})

server.listen( 3000 );
console.log(
    'Server listening on port %d.',
    server.address().port
);
