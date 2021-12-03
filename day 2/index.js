//require fs module
var fs = require('fs');

//Create a function which takes file as input and returns an array
function readFile(file) {
    var data = fs.readFileSync(file, 'utf8');
    var array = data.split('\n');
    return array;
}

//Read file file.txt
var array = readFile('file.txt');

//create 2 variables depth and horizontal pos
var depth = 0;
var horizontalPos = 0;
var aim = 0;

//loop through the array
for (var i = 0; i < array.length; i++) {
    //if the first word of the current element is forward, add the second word to horizontal pos
    if (array[i].split(' ')[0] === 'forward') {
        horizontalPos += parseInt(array[i].split(' ')[1]);
        depth += aim * parseInt(array[i].split(' ')[1]);
    }
    //if the first word of the current element is down, add the second word to depth
    else if (array[i].split(' ')[0] === 'down') {
        aim += parseInt(array[i].split(' ')[1])
    }
    //if the first word of the current element is up, minus the second number from horizontal pos
    else if (array[i].split(' ')[0] === 'up') {
        aim -= parseInt(array[i].split(' ')[1])
    }
}

//log product of horizontal pos and depth
console.log(horizontalPos * depth);