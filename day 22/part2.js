const _ = require('underscore');
const fs = require('fs');

const line_overlap = (min0, max0, min1, max1) => [Math.max(min0, min1), Math.min(max0, max1)];

class Box {
	constructor(x1, x2, y1, y2, z1, z2) {
		this.x1 = x1;
		this.x2 = x2;
		this.y1 = y1;
		this.y2 = y2;
		this.z1 = z1;
		this.z2 = z2;
	}
	get volume() {
		return (this.x2 - this.x1 + 1) * (this.y2 - this.y1 + 1) * (this.z2 - this.z1 + 1);
	}
}

//this will count the times an ON box is overlapped by other boxes
//so we can subtract the already on boxes from the total
function overlap(box, boxes) {
	return boxes.map(b => {
		[minX, maxX] = line_overlap(box.x1, box.x2, b.x1, b.x2);
		[minY, maxY] = line_overlap(box.y1, box.y2, b.y1, b.y2);
		[minZ, maxZ] = line_overlap(box.z1, box.z2, b.z1, b.z2);
		
		if (maxX - minX >= 0 &&
			maxY - minY >= 0 &&
			maxZ - minZ >= 0) return new Box(minX, maxX, minY, maxY, minZ, maxZ).volume - overlap(new Box(minX, maxX, minY, maxY, minZ, maxZ), boxes.slice(1 + boxes.indexOf(b)));
		 else return 0;
	}).reduce((a, b) => a + b, 0);
}


//parse the input
var input = fs.readFileSync('input.txt', 'utf8').split("\n").map((line) => {
	line = line.split(" ")
	var type = line[0]
	var ranges = line[1].split(",").map((r) => r.substring(2).split("..").map(Number)).flat(1);
	return [type, ranges]
});

on = 0;
boxes = [];
//reading input backwards. this way we dont have to worry about offs and only ons
_.each(input.reverse(), i => {
	box = new Box(...i[1]);
	if (i[0] == 'on') on += box.volume - overlap(box, boxes);
	boxes.push(box);
})

console.log(on);