var fs = require('fs');
const readFileLines = () =>
fs
	.readFileSync('input.txt')
	.toString('UTF8')
	.split(' ');


//read and parse input
var input = readFileLines();
var i = {};

input.splice(0,2);
input.forEach(function(x){
	var key = x.split('=')[0];
	var value = x.split('=')[1].split('..').map((e)=>parseInt(e));
	i[key] = value;
});

var xMin = Math.min(...i.x);
var xMax = Math.max(...i.x);
var yMin = Math.min(...i.y);
var yMax = Math.max(...i.y);

//this is the highest value, we can use this to iterate because we know that the velocity cant be higher than this
//adding 1 because thats just how for loops work.
const maxXAbs = Math.max(...i.x.map(Math.abs)) + 1;
const maxYAbs = Math.max(...i.y.map(Math.abs)) + 1;

//checks if a given y velocity reaches the target.
const yValid = (yvel) => {
	let yPos = 0;
	while (true){
    //movement logic
		yPos += yvel;
		yvel--;
    if(yPos >= yMin && yPos <= yMax) return true;
		else if(yPos < yMin) return false; 
    //if the position doesnt match these conditions, it means that the probe is too high, meaning that it still has to come down to hit the target. the loop will repeat until either the probe goes below the minium without hitting or it hits and returns true. 
	}
};

//this figures out if a given x velocity is valid. the y velocity HAS to be valid for it to work. 
const xValid = (xvel, yvel) => {
	const pos = [0, 0];
	while (true){
    //main logic
		pos[0] += xvel;
		pos[1] += yvel;

		if(xvel > 0)
			xvel--;
		else if(xvel < 0)
			xvel++;
		yvel--;

		if(pos[1] >= yMin && pos[1] <= yMax && pos[0] >= xMin && pos[0] <= xMax) return true;
		else if(pos[1] < yMin || pos[0] > xMax) return false;
  //basically the same thing as the first one except it checks both y and x, assuming y is correct.
	
	}
};

//create an array with the valid y velocities
const validYvelocities = [];
for(let i = -maxYAbs; i< maxYAbs; i++){
	if(yValid(i))
		validYvelocities.push(i);
}

//for each valid Y velocity chekc each possible X velocity and if the pair is valid, push it to an array.
const validVelocities = [];
validYvelocities.forEach(yvel => {
  for(let i = -maxXAbs; i< maxXAbs; i++){
		if(xValid(i,yvel))
			validVelocities.push([i,yvel]);
  }
});

//log length of the new array we just created
console.log(validVelocities.length)