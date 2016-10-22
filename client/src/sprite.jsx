class PlayerSprite {

    constructor(x, y, tileSize, pixiSprite, direction) {
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

        this.direction = direction;
        this.sequence = 0;
        this.last_action = (new Date).getTime();
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    incSeq() {
        this.sequence += 1;
    }

    getSeq() {
        return this.sequence;
    }

    getPixelPosition() {
        return [this.pixiSprite.x, this.pixiSprite.y, this.direction];
    }

    setPixiTexture(newTexture){
        this.pixiSprite.texture = newTexture;
    }

    setDirection(direction, directionSprite) {
        this.setPixiTexture(directionSprite);
        this.direction = direction;
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
        //console.log('there is something legit to process');
        var nextControl = this.controlArray[0];
        //console.log(nextControl);
        var toX = (this.x + nextControl.x) * this.tileSize;
        var toY = (this.y + nextControl.y) * this.tileSize;

        var diffX = toX - this.pixiSprite.x;
        var diffY = toY - this.pixiSprite.y;

        var xDelta = 0;
        var yDelta = 0;

        var changeSize = 2;

        if (diffX > 0) {
            xDelta += changeSize;
        } else if (diffX < 0) {
            xDelta -= changeSize;
        }

        if (diffY > 0) {
            yDelta += changeSize;
        } else if (diffY < 0) {
            yDelta -= changeSize;
        }

        //console.log('xdelta: ' + xDelta);
        //console.log('ydelta: ' + yDelta);

        // actually apply the new position
        this.pixiSprite.x += xDelta;
        this.pixiSprite.y += yDelta;
        this.pixiSprite.texture = nextControl.directionTex;
        this.direction = nextControl.direction;

        if (this.pixiSprite.x == ((this.x +nextControl.x) * this.tileSize) &&
                this.pixiSprite.y == ((this.y + nextControl.y) * this.tileSize)) {
            this.x += nextControl.x;
            this.y += nextControl.y;
            this.controlArray.shift();
            this.last_action = (new Date).getTime();
        }
        // if equal, pop off
    }

}

module.exports = PlayerSprite;
