var fs = require('fs');
const readFileLines = () =>
fs
	.readFileSync('input.txt')
	.toString('UTF8')
	.split('\n');

var input = readFileLines();

function combine(arr1, arr2) {
	var result = [];
	for(var i = 0; i < arr1.length; i++) {
			if((arr1[i] == '#') || (arr2[i] == '#')) {
				result.push('#');
			} else {
				result.push('.');
			}
	}
	return result;
}

function flipGrid(grid) {
  return grid[0].map((col, i) => grid.map(row => row[i]));

}

function foldGrid(grid, fold) {
	var type = fold[0];
	var where = fold[1];

	if(type == 'x') grid = flipGrid(grid);
		//for each row greater than where
		for(var i = where; i < grid.length; i++) {
		
			var to = where - (i - where)
			grid[to] = combine(grid[i], grid[to]);
		}
		

		grid.splice(where, grid.length);
		if(type == 'x') grid = flipGrid(grid);
	//count the number of '#' in the grid
return grid;

}

//split input into 2 arrays one after '' and one before ''
var points = input.slice(0, input.indexOf(''));
points = points.map(point => point.split(',').map(Number));

var highestX = points.sort(function(a, b){return b[0] - a[0]})[0][0];
var highestY = points.sort(function(a, b){return b[1] - a[1]})[0][1];

var folds = input.slice(input.indexOf('') + 1);
folds = folds.map(x => x.split(' ')[2].split('='));

var grid = [];
for (var i = 0; i <= highestY; i++) {
	grid[i] = [];
	for (var j = 0; j <= highestX; j++) {
		grid[i][j] = ".";
	}
}

//store each point in grid
points.forEach(point => {
	grid[point[1]][point[0]] = "#";
});

	grid = foldGrid(grid, folds[0]);

var count = 0;
grid.forEach(row => {
	row.forEach(point => {
		if(point == '#') count++;
	});
});


console.log(count);