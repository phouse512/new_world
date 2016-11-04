//var socket = require('socket.io-client')('http://world.phizzle.space/');
var socket = require('socket.io-client')('http://127.0.0.1:9092');

var socketSetup = function() {
    return socket;
};

module.exports = {
    setup: socketSetup,
    socket: socket
};
