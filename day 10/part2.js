var fs = require('fs');
const readFileLines = () =>
fs
	.readFileSync('input.txt')
	.toString('UTF8')
	.split('\n');

var closers = ["}", "]", ")", ">"];
var openers = ["{", "[", "(", "<"];
var input = readFileLines();
var table = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4
}
function parseLine(line) {
//for each char in line



var neededClosers = [];
    for (var i = 0; i < line.length; i++) {

        var char = line[i];
        if(openers.includes(char)) {
            neededClosers.push(closers[openers.indexOf(char)]);
        }
        if(closers.includes(char)) {
            if(neededClosers[neededClosers.length - 1] === char) {
                neededClosers.pop();
            } else {
                return;
            }
        }
    }
    return (neededClosers.reverse());
}    
var sums = [];
input.forEach(line => {
    var sum = 0;
    var parsed = parseLine(line);
    if(parsed) {
        parsed.forEach(char => {
       sum = (sum * 5) + table[char];
        });
    }
    if(sum!== 0 ) sums.push(sum);
})

var sorted = sums.sort((a,b) => a - b)
//log middle number
console.log(sorted[Math.floor(sorted.length / 2)]);

