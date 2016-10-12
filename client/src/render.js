var PIXI = require('pixi.js');

function initializePIXI() {
    var renderer = PIXI.autoDetectRenderer(512, 512);
    document.body.appendChild(renderer.view);

    var stage = new PIXI.Container();

    renderer.render(stage);
}

module.exports = {
    setup: initializePIXI
}
