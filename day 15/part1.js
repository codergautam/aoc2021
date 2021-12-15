var fs = require('fs');

const readFileLines = () =>
fs
    .readFileSync('input.txt')
    .toString('UTF8')
    .split('\n');

var input = readFileLines();
input = input.map((s,ind)=>s.split('').map(c=>parseInt(c)));


var minPathSum = function(grid) {
    let m = grid.length; 
    let n = grid[0].length;
    for (let i=0; i<m; i++) {
        for (let j=0; j<n; j++) {
            if (i==0 && j==0)
                continue;

            if (i==0) {
                grid[i][j]+=grid[i][j-1];
            } else if(j==0) {
                grid[i][j]+=grid[i-1][j];
            } else {
                grid[i][j]+=Math.min(grid[i][j-1], grid[i-1][j]);
            }
        }
    }
    return grid[m-1][n-1];
};
 

// subtract one to ignore start point
  console.log(minPathSum(input)-1)