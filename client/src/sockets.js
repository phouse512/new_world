var socket = require('socket.io-client')('http://localhost:9092');

var socketSetup = function() {
    return socket;
};

module.exports = {
    setup: socketSetup
};
