var fs = require('fs');
const readFileLines = () =>
fs
	.readFileSync('input.txt')
	.toString('UTF8')
	.split('\n');

var input = readFileLines().map((l)=>l.split(' ').map((e,i)=>Number.isNaN(parseInt(e))? e : parseInt(e)));

const ps = [];
//for each section (14 sections in total)
for (let j = 0; j < 14; j++) {
  const args = [];
  //since the lines 4,5, and 15 
  for (const i of [4, 5, 15]) args.push(parseInt(input[i+j*18][2]));
  ps.push(args);
}

	const d = [0];
	const cs = new Array(14).fill(null);
	for (let i = 1; i <= ps.length; i++) {
	  let p = ps[i - 1];
	  if (p[0] == 1) {
		d.push(i);
	  } else {
		cs[i] = d[d.length - 1];
		d.pop();
	  }
	}

	const maxValues = new Array(14).fill(null);
	const minValues = new Array(14).fill(null);

	for (const [i, c] of cs.entries()) {
	  if (c === null) continue;
	  maxValues[c] = Math.min(
		9,
		9 - ps[c - 1][2] - ps[i - 1][1],
	  );
  
	  const sum = ps[c - 1][2] + ps[i - 1][1];
	  minValues[c] = Math.max(1 - sum, 1);
	}
  
	const maxAttempt = [];
	const minAttempt = [];
	for (let i = 1; i < maxValues.length; i++) {
	  maxAttempt.push(maxValues[i]);
	  minAttempt.push(minValues[i]);
	}

	for (const [i, c] of cs.entries()) {
	  if (c == null) continue;
	  maxAttempt[i - 1] = maxAttempt[c - 1] +
		ps[c - 1][2] + ps[i - 1][1];
	  minAttempt[i - 1] = minAttempt[c - 1] +
		ps[c - 1][2] + ps[i - 1][1];
	}

	console.log("max: ",maxAttempt.join("") ,"\nmin: ", minAttempt.join(""));
  
  