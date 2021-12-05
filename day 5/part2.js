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

        //really doesnt matter tbh
        this.start = parse1
        this.end = parse2
    }
    getPoints() {

        var points = [this.start];
        while (points[points.length-1][0] != this.end[0] || points[points.length-1][1] != this.end[1]) {
            var point = [];
            var curPoint = points[points.length-1];
            var xDir = curPoint[0] == this.end[0] ? 0 : curPoint[0] < this.end[0] ? 1 : -1;
            var yDir = curPoint[1] == this.end[1] ? 0 : curPoint[1] < this.end[1] ? 1 : -1;
            point = [curPoint[0] + xDir, curPoint[1] + yDir];
            points.push(point);
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
console.log(board)
console.log(Object.keys(aboveone).length)
