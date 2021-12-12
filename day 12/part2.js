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

   map[line[0]].push(line[1]);
   map[line[1]].push(line[0]); 
})

var num = 0;
function path(letter, previous, already) {
    if(letter == "end") num++
    else {
    map[letter].forEach(letter => {
        if(letter == 'start') return;
        var newAlready = already
        if(letter.toLowerCase() == letter && previous.includes(letter)) {
            if(already) return;
            var newAlready = true;
        }
         path(letter, [...previous, letter], newAlready);
    })
}
}

path("start", [], false);

console.log(num);