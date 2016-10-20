var $ = require('jquery');

var socket = require('./sockets');
var render = require('./render');
var keyboard = require('./keyboard');
var map = 0;
var players = {};

$(document).ready(function() {
    var test = socket.setup();
    render.setup();
    render.animate();
    keyboard.setupKeyboard(test);

    test.on('connect', function() {
        console.log("this is it: " + test.io.engine.id);
    });

    test.on('disconnect', function(){
        console.log('disconnect');
        console.log(players);
    });

    test.on('chats', function(data) {
        JSON.parse(data);
        var temp = 0;
        try {
            temp = JSON.parse(data);
        } catch(err) {
            console.log("failure to deserialize: " + err);
            console.log(err.line);
        }
        
        if(map == 0) {
            render.setupMap(temp.world.map);
            console.log("should log once");
        } else {
            console.log("should log pretty often");
            render.renderGameState(temp.world.map);
        }
        
        render.renderPlayers(temp.playerMap);
        map = temp.world.map;
        players = temp.playerMap;

    });

})

window.test = socket;
