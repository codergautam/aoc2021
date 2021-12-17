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
	var vals = [];
	var ymin = Math.min(...i.y);
  //assuming ymin is negative... not a good way but it works!
	for (var yinit = 0; yinit < -1*ymin; yinit++) {
		var ypos = 0, yvel = yinit, highesty;
    //while the ypos is greater than the minimun pos
		while (ypos >= ymin) { 
		 ypos += yvel;
		 yvel -= 1;
     //if the velocity is 0, y cant go higher anymore
     //so set the highest val  that pos
		 if (yvel == 0) highesty = ypos; 
		};
		 vals.push(highesty); 
	}
//at first i sorted here but thats not needed since the highest vals are pushed last.
console.log(vals[vals.length-1])
