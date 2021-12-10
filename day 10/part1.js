var fs = require('fs');
const readFileLines = () =>
fs
	.readFileSync('input.txt')
	.toString('UTF8')
	.split('\n');

var closers = ["}", "]", ")", ">"];
var openers = ["{", "[", "(", "<"];
var input = readFileLines();

function parseLine(line) {
//for each char in line

var table = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
}

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
                return table[char];
            }
        }
    }
}    
var sum = 0;
input.forEach(line => {
    var parsed = parseLine(line);
    if(parsed) {
        sum += parsed;
    }
})
console.log(sum);