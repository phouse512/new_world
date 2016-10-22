var $ = require('jquery');
var socket = 0;
var _ = require('lodash');
var render = require('./render');

function setupKeyboard(socketDep) {
    console.log('setting up keyboard');
    socket = socketDep; 

    $(document).keydown(_.throttle(keyboardPress, 250));
}

function keyboardPress(event) {
    currentPlayer = render.players[socket.io.engine.id];
    currentPlayer.incSeq();
    if(event.keyCode == 39) {
        if (currentPlayer.direction != 'EAST') {
            new_command = { x: 0, y: 0, direction: 'EAST', sequence: currentPlayer.sequence };
        } else {
            if (!render.isValid(currentPlayer.x+1, currentPlayer.y)) {
                return; 
            }
            new_command = { x: 1, y: 0, direction: 'EAST', sequence: currentPlayer.sequence };
        }
        new_command.directionTex = render.choosePlayerSprite('EAST');
        currentPlayer.addCommand(new_command);
        console.log('MOVE EAST with seq: ' + currentPlayer.getSeq());
        socket.emit("command", { clientId: socket.io.engine.id, command: 'right', sequence: currentPlayer.sequence});
    } else if (event.keyCode == 38) {
        if (currentPlayer.direction != 'NORTH') {
            new_command = { x: 0, y: 0, direction: 'NORTH', sequence: currentPlayer.sequence };
        } else {
            if (!render.isValid(currentPlayer.x, currentPlayer.y-1)) {
                return; 
            }
            new_command = { x: 0, y: -1, direction: 'NORTH', sequence: currentPlayer.sequence };
        }
        new_command.directionTex = render.choosePlayerSprite('NORTH');
        currentPlayer.addCommand(new_command);
        console.log('MOVE NORTH with seq: ' + currentPlayer.getSeq());
        socket.emit("command", { clientId: socket.io.engine.id, command: 'up', sequence: currentPlayer.sequence});
    } else if (event.keyCode == 37) {
        if (currentPlayer.direction != 'WEST') {
            new_command = { x: 0, y: 0, direction: 'WEST', sequence: currentPlayer.sequence };
        } else {
            if (!render.isValid(currentPlayer.x-1, currentPlayer.y)) {
                return; 
            }
            new_command = { x: -1, y: 0, direction: 'WEST', sequence: currentPlayer.sequence };
        }
        new_command.directionTex = render.choosePlayerSprite('WEST');
        currentPlayer.addCommand(new_command);
        console.log('MOVE WEST with seq: ' + currentPlayer.getSeq());
        socket.emit("command", { clientId: socket.io.engine.id, command: 'left', sequence: currentPlayer.sequence});
    } else if (event.keyCode == 40) {
        if (currentPlayer.direction != 'SOUTH') {
            new_command = { x: 0, y: 0, direction: 'SOUTH', sequence: currentPlayer.sequence };
        } else {
            if (!render.isValid(currentPlayer.x, currentPlayer.y+1)) {
                return; 
            }
            new_command = { x: 0, y: 1, direction: 'SOUTH', sequence: currentPlayer.sequence };
        }
        new_command.directionTex = render.choosePlayerSprite('SOUTH');
        currentPlayer.addCommand(new_command);
        console.log('MOVE SOUTH with seq: ' + currentPlayer.getSeq());
        socket.emit("command", { clientId: socket.io.engine.id, command: 'down', sequence: currentPlayer.sequence});
    }
}

module.exports = {
    setupKeyboard: setupKeyboard
}
