// app.js

'use strict';

var http = require( 'http'),
    express = require( 'express'),

    app = express()
;

app.listen( 3000, '127.0.0.1' );

app.use( express.static( __dirname + '/' ));

app.get( '/', function ( req, res ) {
    res.redirect( 'index.html' );
});


module.exports = app;
