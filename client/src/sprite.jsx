class PlayerSprite {
    constructor(x, y, tileSize, pixiSprite) {
        console.log("player sprite constructor");
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.controlArray = [];
        this.animationPointer = null;
        this.animationIndex = 0;
        this.pixiSprite = pixiSprite;
        console.log(pixiSprite);
        this.pixiSprite.scale.x = 2;
        this.pixiSprite.scale.y = 2;
        this.pixiSprite.x = x * tileSize;
        this.pixiSprite.y = y * tileSize;
    }

    getX() {
        return this.x;
    }

    setPixiTexture(newTexture){
        this.pixiSprite.texture = newTexture;
    }

    setNewPosition(newX, newY) {
        this.pixiSprite.x = newX * this.tileSize;
        this.pixiSprite.y = newY * this.tileSize;
        this.x = newX;
        this.y = newY;
    }

    getPixiSprite() {
        return this.pixiSprite;
    }

}

module.exports = PlayerSprite;
