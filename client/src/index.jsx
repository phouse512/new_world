var $ = require('jquery');

var socket = require('./sockets');
var render = require('./render');
var map;

$(document).ready(function() {
    console.log(socket);
    var test = socket.setup();
    console.log(test);
    render.setup();

    test.on('disconnect', function(){
        console.log('disconnect');
    });

    test.on('chats', function(data) {
        try {
            map = JSON.parse(data);
            console.log(map);
        } catch(err) {
            console.log("failure to deserialize: " + err);
        }

    });
})

window.map = map;
