var fs = require('fs');
const readFileLines = () =>
fs
	.readFileSync('input.txt')
	.toString('UTF8')
	.split('\n');

var input = readFileLines();
input = input.map(line => line.split(''));

//getadjacentlocations
const getAdjacentLocations = (index1, index2) => {
    var pos = input[index1][index2];
    var adjacent = [];
    if (index1 > 0) {
        adjacent.push([index1 - 1, index2]);
    }
    if (index1 < input.length - 1) {
        adjacent.push([index1 + 1, index2]);
    }
    if (index2 > 0) {
        adjacent.push([index1, index2 - 1]);
    }
    if (index2 < input[index1].length - 1) {
        adjacent.push([index1, index2 + 1]);
    }
    adjacent = adjacent.map(pos => parseInt(input[pos[0]][pos[1]]));
    return adjacent
}    
var sum = 0;
input.forEach((row, index1) => {
    row.forEach((pos, index2) => {
        var adjacent = getAdjacentLocations(index1, index2);
        if(adjacent.every(apos => pos < apos )) {
            sum += parseInt(pos)+1;
        }
    })
})
console.log(sum)