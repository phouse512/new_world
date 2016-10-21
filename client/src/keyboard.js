var $ = require('jquery');
var socket = 0;
var _ = require('lodash');

function setupKeyboard(socketDep) {
    console.log('setting up keyboard');
    socket = socketDep; 

    $(document).keydown(_.throttle(keyboardPress, 500));
}

function keyboardPress(event) {
    if(event.keyCode == 39) {
        console.log('right arrow press');
        socket.emit("command", { clientId: socket.io.engine.id, command: 'right'});
    } else if (event.keyCode == 38) {
        socket.emit("command", { clientId: socket.io.engine.id, command: 'up'});
    } else if (event.keyCode == 37) {
        socket.emit("command", { clientId: socket.io.engine.id, command: 'left'});
    } else if (event.keyCode == 40) {
        socket.emit("command", { clientId: socket.io.engine.id, command: 'down'});
    }
}

module.exports = {
    setupKeyboard: setupKeyboard
}
