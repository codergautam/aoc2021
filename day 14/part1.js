var fs = require('fs');
const readFileLines = () =>
fs
	.readFileSync('input.txt')
	.toString('UTF8')
	.split('\n');


function step(start, rules) {
	var newStart = "";

	var ruleObj = {}
	rules.forEach(rule => {
		ruleObj[rule.split(' -> ')[0]] = rule.split(' -> ')[1];
	})

	for(var i = 0; i < start.length; i++) {
		var f = start.charAt(i)+ start.charAt(i+1);
		if(f.length != 1) {
		newStart += start.charAt(i)  + ruleObj[f];
		}
	}
	newStart += start.charAt(start.length-1);
	return (newStart)
}

var input = readFileLines();

//split input into 2 arrays one after '' and one before ''
var temp = input.slice(0, input.indexOf(''))[0];
var rules = input.slice(input.indexOf('') + 1);
var steps = 10;

//for steps
for(var i = 0; i < steps; i++) {
	temp = step(temp, rules);
}

//find most common letter
var counts = {};
for(var i = 0; i < temp.length; i++) {
	if(!counts[temp.charAt(i)]) counts[temp.charAt(i)] = 0;
	counts[temp.charAt(i)]++;
}
var mostCommon = Object.values(counts).sort((a, b) => b-a)[0];
var leastCommon = Object.values(counts).sort((a, b) => a-b)[0];




console.log(mostCommon - leastCommon)