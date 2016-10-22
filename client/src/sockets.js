var socket = require('socket.io-client')('http://world.phizzle.space/');

var socketSetup = function() {
    return socket;
};

module.exports = {
    setup: socketSetup
};
