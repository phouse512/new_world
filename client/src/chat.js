var socket = require('./sockets').socket;
var $ = require('jquery');

function chatSetup() {
    
    // listen for server broadcasts
    $("#sendChat").on('click', function() {
        var text = $("#chatField").val();
        if (text == "") {
            return;
        }
        $("#chatField").val("");
        socket.emit("chat", { clientId: socket.io.engine.id, text: text});
    });

    socket.on('serverChat', function(data) {
        $("#chat").append("<strong>" + data.name + ":</strong> " + data.text + "<br />");
    });
}


module.exports = {
    setup: chatSetup
}
