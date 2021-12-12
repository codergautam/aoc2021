var fs = require('fs');
const readFileLines = () =>
fs
	.readFileSync('input.txt')
	.toString('UTF8')
	.split('\n');

var map = {};

readFileLines().forEach(line => {
    var line = line.split('-')
    if(!map[line[0]]) map[line[0]] = [];
    if(!map[line[1]]) map[line[1]] = [];

   if(line[1] != "start") map[line[0]].push(line[1]);
   if(line[0] != "start") map[line[1]].push(line[0]); 
})

var num = 0;
function path(letter, previous) {
    if(letter == "end") num++
    else {
    map[letter].forEach(letter => {
        if(letter.toLowerCase() == letter && previous.indexOf(letter) != -1) return;
        else path(letter, previous+letter);
    })
}
}

path("start", "start");

console.log(num);