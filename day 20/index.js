const fs = require('fs');

const adjacent = [
	[-1, -1],
	[-1, 0],
	[-1, 1],
	[0, -1],
	[0, 0],
	[0, 1],
	[1, -1],
	[1, 0],
	[1, 1]
];


function enhance(alg, img, t) {
	const newImg = [];
	//make the new image bigger than the old one
	for (let rowIndex = -1; rowIndex < img.length + 1; rowIndex++) {
		const row = [];
		//pixels of each row
		for (let pixelIndex = -1; pixelIndex < img.length + 1; pixelIndex++) {
			const pixels = [];

			//since board flashes weird we do t%2
			adjacent.forEach(([imgOff, rowOff]) => {
				pixels.push(img[rowIndex + imgOff]?.[pixelIndex + rowOff] ?? alg[0] & t % 2);
			})
			const num = parseInt(pixels.join(''), 2);
			row.push(alg[num]);
		}
		newImg.push(row);
	}
	return newImg;
}


function solve(alg, img, times) {
	//convert to 0s and 1s
	alg = alg.split('').map((char) => (char === '#' ? 1 : 0));
	img = img
		.split('\n')
		.map((row) => row.split('').map((char) => (char === '#' ? 1 : 0)));

	//times to enhance
	for (let t = 0; t < times; t++) {
		img = enhance(alg, img, t);
	}
	//flatten and only count 1s
	return img.flat().filter((e) => e == 1).length;
}
const input = fs.readFileSync('input.txt', 'utf8').trimEnd();
var alg = input.split('\n\n')[0];
var img = input.split('\n\n')[1];

console.log("Part 1: "+solve(alg, img, 2));
console.log("Part 2: "+solve(alg, img, 50));
