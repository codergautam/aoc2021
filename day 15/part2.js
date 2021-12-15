var fs = require('fs');

const readFileLines = () =>
fs
	.readFileSync('input.txt')
	.toString('UTF8')
	.split('\n');

var input = readFileLines();
input = input.map((s,ind)=>s.split('').map(c=>parseInt(c)));
var startingTile = [...input];

var dijkstra = require('dijkstrajs');

function goUp(grid) {
		grid = grid.map((s)=> {
			return s.map((y)=>{
				y+=1;
				if(y>9) y=1;
				return y;
			})
		})
	
	return grid;
}
function goUpTimes(grid, times) {
	for(var i=0;i<times;i++) {
		grid = goUp(grid);
	}
	return grid;
}



//for 4 times
for(var i=1;i<5;i++) {
	var tile = goUpTimes(startingTile,i)
	input= input.map((s,ind)=>s.concat(tile[ind]));
}
var alsoStartingTile = [...input];

for(var i=1;i<5;i++) {
	var tile = goUpTimes(alsoStartingTile,i)
	tile.forEach(element => {
		input.push(element)
	});
	
}


function toObj(grid) {
	var obj = {};
	for (var y = 0; y < input.length; y++) {
		var row = input[y]
		for (var x = 0; x < row.length; x++) { 
		  var value = input[y][x]
		  obj[y+','+x] = {};
		  var adjacent = [];
		  
		  if(y > 0) adjacent.push({x: x, y: y-1})
		  if(y < input.length-1) adjacent.push({x: x, y: y+1})
		  if(x > 0) adjacent.push({x: x-1, y: y})
		  if(x < row.length-1) adjacent.push({x: x+1, y: y})
				for(var f = 0; f < adjacent.length; f++) {
				  var a = adjacent[f]
				  var adjNode = input[a.y][a.x]
				obj[y+','+x][adjacent[f].y+','+adjacent[f].x] = adjNode;
				}
		}
	  }
	return obj;
}
var path= dijkstra.find_path(toObj(input), '0,0',`${input.length-1},${input[0].length-1}`);

//sum values of path
var sum = 0;
path.forEach(element => {
	element = element.split(',').map(Number);
	sum+=input[element[0]][element[1]];
});
console.log(sum-1);


//console.log(minPathSum(input)-1);
