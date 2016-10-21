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

    getY() {
        return this.y;
    }

    getPixelPosition() {
        return [this.pixiSprite.x, this.pixiSprite.y];
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

    getControls() {
        return this.controlArray;
    }

    addCommand(newCommand) {
        this.controlArray.push(newCommand);
    }

    // this method should be used to generate the x/y pixel coordinates as well
    // as which frame should be used
    processTick() {
        if (this.controlArray.length < 1) {
            return;
        }
        console.log('there is something legit to process');
        var nextControl = this.controlArray[0];
        console.log(nextControl);
        var toX = nextControl.x * this.tileSize;
        var toY = nextControl.y * this.tileSize;

        var diffX = toX - this.pixiSprite.x;
        var diffY = toY - this.pixiSprite.y;

        var xDelta = 0;
        var yDelta = 0;

        if (diffX > 0) {
            xDelta += 10;
        } else if (diffX < 0) {
            xDelta -= 10;
        }

        if (diffY > 0) {
            yDelta += 10;
        } else if (diffY < 0) {
            yDelta -= 10;
        }

        console.log('xdelta: ' + xDelta);
        console.log('ydelta: ' + yDelta);

        // actually apply the new position
        this.pixiSprite.x += xDelta;
        this.pixiSprite.y += yDelta;

        if (this.pixiSprite.x == (nextControl.x * this.tileSize) &&
                this.pixiSprite.y == (nextControl.y * this.tileSize)) {
            this.controlArray.shift();
        }
        // if equal, pop off
    }

}

module.exports = PlayerSprite;
