const fs = require('fs');
var input = fs.readFileSync('input.txt', 'utf8');

Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

class Vent {
    constructor(string) {
        var arr = string.split('->');
        arr[0] = arr[0].trim();
        arr[1] = arr[1].trim();

        var parse1 =arr[0].split(',').map(x => parseInt(x));
        var parse2 =arr[1].split(',').map(x => parseInt(x));

        var step = (parse1[0] == parse2[0] ? 1 : 0);

        this.start = (parse1[step] < parse2[step] ? parse1 : parse2);
        this.end = (parse1[step] < parse2[step] ? parse2 : parse1);
    }
    getPoints() {
        if(this.end[0] != this.start[0] && this.end[1] != this.start[1]) return [];


        var points = [];
        var step = (this.end[0] == this.start[0] ? 1 : 0);
        for (var i = this.start[step]; i <= this.end[step]; i++) {
            points.push(step == 0 ? [i, this.start[1]] : [this.start[0], i]);
        }
        return points;
    }
}

input = input.split('\n');
var board = {};
input.forEach(element => {
    new Vent(element).getPoints().forEach(point => {
        if(board.hasOwnProperty(point.toString())) {
            board[point.toString()]++;
        }
        else {
            board[point.toString()] = 1;
        }
    })
});


var aboveone = Object.filter(board, x => x > 1);
console.log(Object.keys(aboveone).length)

