var PIXI = require('pixi.js');
var constants = require('./constants');
console.log('come on man');
var PlayerSprite = require('./sprite.jsx');

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

var mapTiles = null;
var players = {};

function initializePIXI() {
    renderer = PIXI.autoDetectRenderer(constants.tileSize * constants.width,
            constants.tileSize * constants.height);
    document.body.appendChild(renderer.view);

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

    console.log(mapTiles);
    console.log('height: ' + mapTiles.length);
    console.log('width: ' + mapTiles[0].length);
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

    for (var key in playerMap) {
        if (playerMap.hasOwnProperty(key)) {
            
            if(!(key in players)) {
                // this is a new player!!
                // add new pixi player sprite
                var tempSprite = new PIXI.Sprite(choosePlayerSprite(playerMap[key].direction));
                var newSprite = new PlayerSprite(playerMap[key].x, playerMap[key].y, constants.tileSize,
                        tempSprite, playerMap[key].direction);

                stage.addChild(newSprite.getPixiSprite());
                players[key] = newSprite;
            } else { // this player exists!! find existing sprite and edit that
                var existingSprite = players[key];
               
                console.log('local seq: ' + existingSprite.getSeq() + ' server seq: ' + playerMap[key].sequence);
                if ((existingSprite.getSeq() == playerMap[key].sequence) && (existingSprite.getControls().length < 1) && (((new Date).getTime() - existingSprite.last_action) > 700)) {
                    console.log('WARNING WARNING WARNING WARNING');
                    // at this point, the client has nothing left to process,
                    // set position to server. Unless they are hacking, this
                    // should be FINE!
                    existingSprite.setNewPosition(playerMap[key].x, playerMap[key].y);
                } else if (playerMap[key].sequence > existingSprite.getSeq()) {
                    command = { x: playerMap[key].x, y: playerMap[key].y, sequence: playerMap[key].sequence,
                        direction: playerMap[key].direction, directionTex: choosePlayerSprite(playerMap[key].direction) };
                    existingSprite.addCommand(command);
                }
                // this is old simple logic that doesn't do any interpolating
                // existingSprite.setPixiTexture(choosePlayerSprite(playerMap[key].direction));
                // existingSprite.setNewPosition(playerMap[key].x, playerMap[key].y);


                // testbed for new code that interpolates
                //currentCoordinates = existingSprite.getPixelPosition();
                //console.log(currentCoordinates);
                //console.log("x: " + playerMap[key].x + " y: " + playerMap[key].y + " dir: " + playerMap[key].direction);
                //if ((currentCoordinates[0] == (playerMap[key].x * constants.tileSize)) &&
                //        (currentCoordinates[1] == (playerMap[key].y * constants.tileSize)) &&
                //        (currentCoordinates[2] == playerMap[key].direction)) {
                    // the server position is the same as the current sprite,
                    // this is the sane case where there is no work to be done
                    // :) 
                    //console.log('existing sprite don\'t need no movement');
                //} else {
                    //console.log('there is some mismatch here');
                    // psyche they're different, get to work son

                    // we need to check the player sprite object's control
                    // array - if this command is in there, the sprite is in
                    // the middle of animating, let it be. Otherwise we have to
                    // add it to the end of the array to be processed
//                    server_command = { x: playerMap[key].x, y: playerMap[key].y, 
//                        directionTex: choosePlayerSprite(playerMap[key].direction),
//                        direction: playerMap[key].direction };
//                    if (existingSprite.getControls().length < 1) {
//                        existingSprite.addCommand(server_command);
//                    } else if (existingSprite.getControls()[0] != server_command) {
//                        existingSprite.addCommand(server_command);
//                    }

                //existingSprite.processTick();
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

function animate() {
    requestAnimationFrame(animate);

    for (var key in players) {
        if (players.hasOwnProperty(key)) {
            players[key].processTick();
        }
    }
    renderer.render(stage);
}

module.exports = {
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
