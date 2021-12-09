var fs = require('fs');
const readFileLines = () =>
fs
	.readFileSync('input.txt')
	.toString('UTF8')
	.split('\n');

var input = readFileLines();
input = input.map(line => line.split(''));
function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

//getadjacentlocations
const getAdjacentLocations = (index1, index2, returnIndex=true) => {
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
    if(returnIndex) adjacent = adjacent.map(pos => parseInt(input[pos[0]][pos[1]]));
    return adjacent;
}    
var basins = [];
const findBasins = (index1, index2) => {
    var curBasils = [[index1, index2]];
    function filtg (adjacent) {
    return adjacent.filter(pos => !(input[pos[0]][pos[1]] == '9' || basins.includes([pos[0], pos[1]]) || curBasils.includes([pos[0], pos[1]])))
    }
    var added = 1;
    while (added > 0) {
        var old = [...curBasils];
        curBasils.forEach(pos => {
            var adjacent = getAdjacentLocations(pos[0], pos[1], false);
            var filtered = filtg(adjacent);
            filtered = uniq(filtered)
            added += filtered.length;
            curBasils = uniq(curBasils.concat(filtered));
            
        });
        added = curBasils.length - old.length;
        }
        basins = basins.concat(curBasils);
       return curBasils.length;

}

var basinLengths = [];
input.forEach((row, index1) => {
    row.forEach((pos, index2) => {
        var adjacent = getAdjacentLocations(index1, index2);
        if(adjacent.every(apos => pos < apos )) {
            //its a low point
           
            //find basins
            basinLengths.push(findBasins(index1, index2));

        }
    })
})

basinLengths = basinLengths.sort((a, b) => b - a);

//keep only 3 largest in array
basinLengths = basinLengths.slice(0, 3);

//multiply each basinlength
var total = basinLengths.reduce((a, b) => a * b);

console.log(total);