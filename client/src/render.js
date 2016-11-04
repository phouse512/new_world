var PIXI = require('pixi.js');
var constants = require('./constants');
var PlayerSprite = require('./sprite.jsx');
var $ = require('jquery');

// pixi global variables
var stage = null;
var renderer = null;
var MiddleTexture = PIXI.Texture.fromImage("assets/grass-middle.png");
var RightTexture = PIXI.Texture.fromImage("assets/right-pattern.png");
var LeftTexture = PIXI.Texture.fromImage("assets/grass-left.png");
var BottomTexture = PIXI.Texture.fromImage("assets/grass-bottom-middle.png");
var TopTexture = PIXI.Texture.fromImage("assets/grass-top.png");
var TopLeftTexture = PIXI.Texture.fromImage("assets/grass-top-left.png");
var BottomLeftTexture = PIXI.Texture.fromImage("assets/grass-bottom-left.png");
var BottomRightTexture = PIXI.Texture.fromImage("assets/grass-bottom-right.png");
var TopRightTexture = PIXI.Texture.fromImage("assets/grass-top-right.png");

var FacingDownTex = PIXI.Texture.fromImage("assets/down.png");
var FacingLeftTex = PIXI.Texture.fromImage("assets/left.png");
var FacingUpTex = PIXI.Texture.fromImage("assets/up.png");
var FacingRightTex = PIXI.Texture.fromImage("assets/right.png");

var selectLock = false;
var SelectTex = PIXI.Texture.fromImage("assets/frame.png");

var selectSprite = null;
var mapTiles = null;
var players = {};

function initializePIXI() {
    var canvas = document.getElementById("gameCanvas");
    renderer = PIXI.autoDetectRenderer(constants.tileSize * constants.width,
            constants.tileSize * constants.height, { view: canvas });

    stage = new PIXI.Container();
    renderer.render(stage);
}
    
function setupMap(map) {
    mapTiles = [];
    for (var y = 0; y < constants.height; y++) {
        mapTiles.push([]);
        mapTiles[y].push(new Array(constants.width));
        for (var x = 0; x<constants.width; x++) {
            var tempSprite = new PIXI.Sprite(MiddleTexture);
            tempSprite.scale.x = 2;
            tempSprite.scale.y = 2;
            tempSprite.x = x * constants.tileSize;
            tempSprite.y = y * constants.tileSize;
            stage.addChild(tempSprite);
            mapTiles[y][x] = tempSprite;
        }
    }
    
    // SETUP SELECTOR HEADER
    selectSprite = new PIXI.Sprite(SelectTex);
    selectSprite.scale.x = 1;
    selectSprite.scale.y = 1;
    selectSprite.x = 0;
    selectSprite.y = 0;
    stage.addChild(selectSprite);

    // ADD EVENT LISTENER FOR SELECTING A SQUARE
    $("#gameCanvas").on('click', function() {
        selectLock = !selectLock;
    });
}

function setupSprites() {

    var middleGrass = new PIXI.Sprite(MiddleTexture);
    middleGrass.scale.x = 2;
    middleGrass.scale.y = 2;
    middleGrass.x = 0;
    middleGrass.y = 0;

    stage.addChild(middleGrass);
    renderer.render(stage);
    console.log('sprite setup');
}

function renderPlayers(playerMap) {
    

    //delete old characters
    for (var key in players) {
        if (players.hasOwnProperty(key)) {
            if (!(key in playerMap)) {
                // this player is deleted off the server
                stage.removeChild(players[key].pixiSprite);
                delete players[key];
            }
        }
    }

    for (var key in playerMap) {
        if (playerMap.hasOwnProperty(key)) {
            
            if(!(key in players)) {
                // this is a new player!!
                // add new pixi player sprite
                var textSprite = new PIXI.Text(playerMap[key].name, {fontFamily: 'Arial', fontSize: 10, fill: '#ffffff', align: 'center'});
                var tempSprite = new PIXI.Sprite(choosePlayerSprite(playerMap[key].direction));
                tempSprite.addChild(textSprite);
                textSprite.y -= 15;
                var newSprite = new PlayerSprite(playerMap[key].x, playerMap[key].y, constants.tileSize,
                        tempSprite, playerMap[key].direction);

                stage.addChild(newSprite.getPixiSprite());
                players[key] = newSprite;
            } else { // this player exists!! find existing sprite and edit that
                var existingSprite = players[key];
               
                //console.log('local seq: ' + existingSprite.getSeq() + ' server seq: ' + playerMap[key].sequence);
                if ((existingSprite.getSeq() == playerMap[key].sequence) && (existingSprite.getControls().length < 1) && (((new Date).getTime() - existingSprite.last_action) > 700)) {
                    //console.log('WARNING WARNING WARNING WARNING');
                    // at this point, the client has nothing left to process,
                    // set position to server. Unless they are hacking, this
                    // should be FINE!
                    existingSprite.setNewPosition(playerMap[key].x, playerMap[key].y);
                } else if (playerMap[key].sequence > existingSprite.getSeq()) {
                    diffX = playerMap[key].x - existingSprite.x;
                    diffY = playerMap[key].y - existingSprite.y;

                    existingSprite.addCommand({ x: diffX, y: diffY, direction: playerMap[key].direction, directionTex: choosePlayerSprite(playerMap[key].direction) });
                }
            }
        }
    }
}



function animatePlayer(clientSprite, serverSprite) {
    console.log('animation');
}

function choosePlayerSprite(direction) {
    switch(direction) {
        case "SOUTH":
            return FacingDownTex;
        case "NORTH":
            return FacingUpTex;
        case "EAST":
            return FacingRightTex;
        default:
            return FacingLeftTex;
    }
}


// renders all the tiles, no game objects
function renderGameState(mapObj) {
    for (var y = 0; y < mapObj.length; y++) {
        for (var x = 0; x < mapObj[y].length; x++) {
            if (y == 0) {
                mapTiles[y][x].texture = TopTexture;
            }
            if (x == 0) {
                mapTiles[y][x].texture = LeftTexture;
            }
            if (x == (constants.width - 1)) {
                mapTiles[y][x].texture = RightTexture;
            }
            if (y == (constants.height - 1)) {
                mapTiles[y][x].texture = BottomTexture;
            }

            
            if (x == (constants.width-1) && y == 0) { // top right
                mapTiles[y][x].texture = TopRightTexture;
            }
            if (x == (constants.width-1) && y == (constants.height-1)) { // bottom right
                mapTiles[y][x].texture = BottomRightTexture;
            }
            if (x == 0 && y == (constants.height-1)) { // bottom left
                mapTiles[y][x].texture = BottomLeftTexture;
            }
             
            if (x == 0 && y == 0) { // top left
                mapTiles[y][x].texture = TopLeftTexture;
            }
        }
    }
}

var startingTime;
var lastTime;
var dt;
var timestep = 1000/ 30;

function updateSelector() {
    if (selectSprite == null || selectLock) {
        return;
    }
    position = renderer.plugins.interaction.mouse.global;

    x = position.x;
    y = position.y;

    xDiff = x % constants.tileSize;
    yDiff = y % constants.tileSize;

    selectSprite.x = x - xDiff;
    selectSprite.y = y - yDiff;
}

function animate(currentTime) {
    if(!lastTime) { lastTime = currentTime; }
    delta = currentTime - lastTime;
    lastTime = currentTime;

    for (var key in players) {
        if (players.hasOwnProperty(key)) {
            players[key].processTick(delta);
        }
    }
    updateSelector();
    renderer.render(stage);
    
    requestAnimationFrame(animate);

}

// this method takes an x and y input and returns a boolean
//   true for valid, false if an object may not be placed there
function isValid(x, y) {
    // check for other players
    for (var key in players) {
        if (players[key].x == x && players[key].y == y) {
            return false;
        }
    }

    // check for map boundaries
    if (x < 0 || x >= constants.width || y < 0 || y >= constants.height) {
        return false;
    }

    return true;
}

module.exports = {
    isValid: isValid,
    setup: initializePIXI,
    setupMap: setupMap,
    sprites: setupSprites,
    animate: animate,
    renderGameState: renderGameState,
    renderPlayers: renderPlayers,
    players: players,
    choosePlayerSprite: choosePlayerSprite
}

window.choosePlayerSprite = choosePlayerSprite;
window.all_players = players;
