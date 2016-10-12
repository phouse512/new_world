var $ = require('jquery');

var socket = require('./sockets');

$(document).ready(function() {
    console.log(socket);
    var test = socket.setup();
    console.log(test);

    test.on('disconnect', function(){
        console.log('disconnect');
    });

    test.on('chats', function(data) {
        console.log(data);
    });
})
