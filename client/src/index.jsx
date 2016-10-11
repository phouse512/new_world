var $ = require('jquery');

var socket = require('./sockets');

$(document).ready(function() {
    console.log(socket);
    var test = socket.setup();
    console.log(test);
})
