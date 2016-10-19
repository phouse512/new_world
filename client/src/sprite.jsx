class PlayerSprite {
    constructor(x, y, tileSize, pixiSprite) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.controlArray = [];
        this.animationPointer = null;
        this.animationIndex = 0;
        this.pixiSprite = pixiSprite;
    }

    getX() {
        return this.x;
    }

    setPixiTexture(){

    }


}

module.exports = PlayerSprite;
