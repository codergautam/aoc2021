var fs = require('fs');
const readFileLines = () =>
fs
	.readFileSync('input.txt')
	.toString('UTF8')
	.split('\n');


function toObj(str) {
	var obj = {};
	for(var i = 0; i < str.length; i++) {
		var f = str.charAt(i)+ str.charAt(i+1);
		var f2 = str.charAt(i-1)+ str.charAt(i);
		if(f.length != 1) {
			if(!obj[f]) obj[f]=0;
			obj[f]++;
		}
	}
	return (obj)

}

function step(start, ruleObj) {
	var newObj = {};
	Object.keys(start).forEach(function(key) {
		var f = key.charAt(0)+key.charAt(1);
		if(ruleObj[f]) {
			var f2 = key.charAt(0)+ruleObj[f];
			var f3 = ruleObj[f]+key.charAt(1);
			if(!newObj[f2]) newObj[f2]=0;
			newObj[f2]+= start[key];
			if(!newObj[f3]) newObj[f3]=0;
			newObj[f3]+= start[key];
		}
	})
	return newObj;
}

var input = readFileLines();

//split input into 2 arrays one after '' and one before ''
var temp = input.slice(0, input.indexOf(''))[0];
var lastLetter = temp.charAt(temp.length-1);
temp = toObj(temp);
var rules = input.slice(input.indexOf('') + 1);
var ruleObj = {}
rules.forEach(rule => {
	ruleObj[rule.split(' -> ')[0]] = rule.split(' -> ')[1];
})
var steps = 40

//for steps
for(var i = 0; i < steps; i++) {
	temp = step(temp, ruleObj);
}

//find most common letter
var counts = {};

Object.keys(temp).forEach(function(key) {
	var num = key.charAt(0)
	if(!counts[num]) counts[num]=0;
	counts[num]+=temp[key];

})
if(!counts[lastLetter]) counts[lastLetter]=0;
counts[lastLetter]++

var mostCommon = Object.values(counts).sort((a, b) => b-a)[0];
var leastCommon = Object.values(counts).sort((a, b) => a-b)[0];

console.log(mostCommon-leastCommon)