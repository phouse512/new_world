var PIXI = require('pixi.js');
var constants = require('./constants');
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


    var testPlayer = new PlayerSprite(1, 23, 15);
    console.log(testPlayer.getX());
}
    
function setupMap(map) {
    mapTiles = [];
    for (var y = 0; y < constants.height; y++) {
        mapTiles.push([]);
        mapTiles[y].push(new Array(constants.width));
        for (var x = 0; x<constants.width; x++) {
            tempSprite = new PIXI.Sprite(MiddleTexture);
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
                playerSprite = new PIXI.Sprite(choosePlayerSprite(playerMap[key].direction));
                playerSprite.scale.x = 2;
                playerSprite.scale.y = 2;
                playerSprite.x = playerMap[key].x * constants.tileSize;
                playerSprite.y = playerMap[key].y * constants.tileSize;
                stage.addChild(playerSprite);
                console.log(playerMap[key]);
                players[key] = playerSprite;
            } else { // this player exists!! find existing sprite and edit that
                existingSprite = players[key];
                existingSprite.texture = choosePlayerSprite(playerMap[key].direction);
                existingSprite.x = playerMap[key].x * constants.tileSize;
                existingSprite.y = playerMap[key].y * constants.tileSize;
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
    renderer.render(stage);
}

module.exports = {
    setup: initializePIXI,
    setupMap: setupMap,
    sprites: setupSprites,
    animate: animate,
    renderGameState: renderGameState,
    renderPlayers: renderPlayers
}
