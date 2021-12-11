var fs = require('fs');
const readFileLines = () =>
fs
	.readFileSync('input.txt')
	.toString('UTF8')
	.split('\n');

    var grid = readFileLines().map((row) => row.split("").map(Number));

    var flashCount = 0;

function point(grid, y, x, flashed) {
    if(grid[y][x] === 9) {
        //flashed lol
        flash(grid, y, x, flashed);
    } else {
        //console.log(flashed)
        if(!flashed[y][x]) {
            //if not flashed
            grid[y][x]++;
        }
    }
}


    function flash(grid, y, x, flashed) {
        grid[y][x] = 0;
        flashed[y][x] = true;
        flashCount++;
      
        for (let yy = y - 1; yy <= y + 1; yy++) {
          for (let xx = x - 1; xx <= x + 1; xx++) {
              if(yy < 0 || xx < 0 || yy >= grid.length || xx >= grid[0].length) continue;
            point(grid, yy, xx, flashed);
          }
        }
      }
      


function step(grid) {
    var flashed = {0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}, 8: {}, 9: {}};
    grid.forEach((row, y) => {
    
        row.forEach((cell, x) => {
            if(!flashed[y][x]) flashed[y][x] = false;
            point(grid, y, x, flashed);
        });
    })
}
var steps = 10000;
//run 10 steps
for (let i = 0; i < steps; i++) {
    step(grid);
    //check if each cell is the same
    var same = true;
    grid.forEach((row, y) => {
        row.forEach((cell, x) => {
            if(cell !== 0) same = false;
        });
    }
    )
    //when you foget that computers count from 0
   if(same) { console.log(i+1)
    break;
   };
}