var fs = require('fs');
const { get } = require('underscore');
var _ = require('underscore');
const readFileLines = () =>
fs
	.readFileSync('input.txt')
	.toString('UTF8')
	.split('\n');

var input = readFileLines();

function getCubes(xR,yR,zR) {
	var cubes = [];
	_.range(xR[0],xR[1]+1).forEach(x => {
		if(Math.abs(x) >50) return; 
		_.range(yR[0],yR[1]+1).forEach(y => {
			if(Math.abs(y) >50) return;
			_.range(zR[0],zR[1]+1).forEach(z => {
				if(Math.abs(z) >50) return;
				cubes.push([x,y,z]);
			});
		})
	})
	return cubes
}
var reactor  = {}
input.forEach((line,i) => {
	line = line.split(" ")
	var type = line[0]=="on"?true:false;
	var ranges = line[1].split(",")
	var xR = ranges[0].split("..").map((e,i)=>i<1?e.split("=")[1]:e).map(Number);
	var yR = ranges[1].split("..").map((e,i)=>i<1?e.split("=")[1]:e).map(Number);
	var zR = ranges[2].split("..").map((e,i)=>i<1?e.split("=")[1]:e).map(Number);
	var cubes = getCubes(xR,yR,zR);
	cubes.forEach(cube => {
		 reactor[cube.join(",")] = type;
	})
	
})
console.log(Object.values(reactor).filter(Boolean).length)