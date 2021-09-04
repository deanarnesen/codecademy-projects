const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor(width, height) {
        if (height === undefined){
            this._field = width;
            this._width = width[0].length;
            this._height = width.length;
        } else {
            this._field = this.generateField(width, height);
        }

    }
    print() {
        for(let i = 0; i < this._field.length; i++) {
            for(let j = 0; j < this._field[i].length; j++) {
                process.stdout.write(this._field[i][j]);
            }
            process.stdout.write('\r\n')
        }
    }
    get field() {
        return this._field;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    generateField(width, height) {
        let fieldBuilder = [];
        for(let i = 0; i < height; i++) {
            fieldBuilder[i] = [];
            for(let j = 0; j < width; j++) {
                fieldBuilder[i].push(this.randomTile(.2))
            }
        }
        let hatX = Math.floor(Math.random() * width);
        let hatY = Math.floor(Math.random() * height);
        fieldBuilder[hatY][hatX] = '^';
        fieldBuilder[0][0] = '*';
        return fieldBuilder;
    }
    randomTile(holePercent) {
        let roll = Math.random();
        if(roll < holePercent) {
            return 'O';
        } else {
            return '░';
        }

    }
    updatePath(player) {
        this.field[player.y][player.x] = '*';
    }
    inHole(player) {
        return this.field[player.y][player.x] === 'O';
    }
    onHat(player) {
        return this.field[player.y][player.x] === '^';
    }
    offEdge(player) {
        if(player.x < 0 || player.x > this.field.width) {
            return true;
        } else if (player.y < 0 || player.y > this.field.width) {
            return true;
        } else {
            return false;
        }
    }
}
class Player {
    constructor() {
        this._x = 0;
        this._y = 0;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    set x(newX) {
        this._x = newX;
    }
    set y(newY) {
        this._y = newY;
    }
    moveUp() {
        this.y -= 1;
    }
    moveDown() {
        this.y += 1;
    }
    moveLeft() {
        this.x -= 1;
    }
    moveRight() {
        this.x += 1;
    }
}

class Game {
    constructor(height, width) {
        if(height === undefined) {
            this._field = new Field([
                ['*', '░', 'O'],
                ['░', 'O', '░'],
                ['░', '^', '░'],
            ])
            this._player = new Player();
        } else if (width !== undefined) {
            this._player = new Player();
            this._field = new Field(height, width);
        }
    }
    get field() {
        return this._field;
    }
    get player() {
        return this._player;
    }
    start() {
        let dead = false;
        while(!dead) {
            this._field.print();
            let move = prompt('(w/a/s/d) -> enter to move');
            switch (move) {
                case 'w':
                    this._player.moveUp();
                    break;
                case 'a':
                    this.player.moveLeft();
                    break;
                case 's':
                    this.player.moveDown();
                    break;
                case 'd':
                    this.player.moveRight();
                    break;
                default:
                    continue;
            }
            if (this.field.offEdge(this.player)) {
                dead = true;
                console.log("Dont walk off the edge!")
            } else if (this.field.inHole(this.player)) {
                dead = true;
                console.log("You fell in a hole!");
            } else if (this.field.onHat(this.player)) {
                console.log("You win!");
                break;
            } else {
                this.field.updatePath(this.player);
            }
        }
        if(dead) {
            console.log("You lose!");
        }
    }
}



const myGame = new Game(100, 10);
myGame.start();

