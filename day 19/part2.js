const fs = require('fs');

const readFileLines = () =>
fs
	.readFileSync('input.txt')
	.toString('UTF8')
	.split('\n\n');
var scanners = readFileLines().map((scanner)=>scanner.split("\n").slice(1).map(line=>line.split(",").map(Number)));
console.log("please wait 1-2mins")
var rots = [
    p => [ p[0], p[1], p[2] ],
    p => [ p[0], p[2], p[1] ],
    p => [ p[1], p[0], p[2] ],
    p => [ p[1], p[2], p[0] ],
    p => [ p[2], p[0], p[1] ],
    p => [ p[2], p[1], p[0] ],
 
    p => [ -p[0], p[1], p[2] ],
    p => [ -p[0], p[2], p[1] ],
    p => [ -p[1], p[0], p[2] ],
    p => [ -p[1], p[2], p[0] ],
    p => [ -p[2], p[0], p[1] ],
    p => [ -p[2], p[1], p[0] ],
 
    p => [ p[0], -p[1], p[2] ],
    p => [ p[0], -p[2], p[1] ],
    p => [ p[1], -p[0], p[2] ],
    p => [ p[1], -p[2], p[0] ],
    p => [ p[2], -p[0], p[1] ],
    p => [ p[2], -p[1], p[0] ],
 
    p => [ p[0], p[1], -p[2] ],
    p => [ p[0], p[2], -p[1] ],
    p => [ p[1], p[0], -p[2] ],
    p => [ p[1], p[2], -p[0] ],
    p => [ p[2], p[0], -p[1] ],
    p => [ p[2], p[1], -p[0] ],
 
    p => [ -p[0], -p[1], p[2] ],
    p => [ -p[0], -p[2], p[1] ],
    p => [ -p[1], -p[0], p[2] ],
    p => [ -p[1], -p[2], p[0] ],
    p => [ -p[2], -p[0], p[1] ],
    p => [ -p[2], -p[1], p[0] ],
 
    p => [ p[0], -p[1], -p[2] ],
    p => [ p[0], -p[2], -p[1] ],
    p => [ p[1], -p[0], -p[2] ],
    p => [ p[1], -p[2], -p[0] ],
    p => [ p[2], -p[0], -p[1] ],
    p => [ p[2], -p[1], -p[0] ],
 
    p => [ -p[0], p[1], -p[2] ],
    p => [ -p[0], p[2], -p[1] ],
    p => [ -p[1], p[0], -p[2] ],
    p => [ -p[1], p[2], -p[0] ],
    p => [ -p[2], p[0], -p[1] ],
    p => [ -p[2], p[1], -p[0] ],
 
    p => [ -p[0], -p[1], -p[2] ],
    p => [ -p[0], -p[2], -p[1] ],
    p => [ -p[1], -p[0], -p[2] ],
    p => [ -p[1], -p[2], -p[0] ],
    p => [ -p[2], -p[0], -p[1] ],
    p => [ -p[2], -p[1], -p[0] ]
]

function transform(scanner, rot, dist) {
  return scanner.map((beacon) => {
    return rot(beacon).map((coord, i) => {
      return coord + dist[i];
    });
  });
}

  // figure out all overlapping detection cubes
  const transforms = scanners.map(() => ({}));
  transforms[0] = {
    0: [
      {
        rot: rots[0],
        dist: [0, 0, 0],
      },
    ],
  };
//loop through each scanner
  for (let i = 0; i < scanners.length; i++) {
	  //scanner 1
    const scanner1 = scanners[i];
 	for (let j = 0; j < scanners.length; j++) {
		 //scanner 2
		const scanner2 = scanners[j];

		//if both scanners are equal, skip
      if (i === j) {
        continue;
      }

      for (const rot of rots) {
		  //for each rotation
        const dists = {};

        for (const beacon1 of scanner1) {
			//try rotate the beacon
          const [x1, y1, z1] = rot(beacon1);
          for (const beacon2 of scanner2) {
			  //dont rotate the second beacon since we compare
            const [x2, y2, z2] = beacon2;

			//get the distance between the two beacons 
            const dist = [x2 - x1, y2 - y1, z2 - z1];

            dists[dist.join()] = (dists[dist.join()] ?? 0) +1;
			//if 12 have matched, append to transforms
			//we appened the original dist and the transform used to map. this will be used later.
            if (dists[dist] === 12) transforms[i][j] = [{ rot, dist}];
          }
        }
      }
    }
  }


while (transforms.some((t) => !t[0])) {
    for (let i = 0; i < transforms.length; i++) {
      for (const j in transforms[i]) {
        if (!transforms[j][0]) continue;

        transforms[i][0] = transforms[i][j].concat(transforms[j][0]);
      }
    }
  }

  // find unique beacons
  const beacons = new Set();
 
  for (let i = 0; i < scanners.length; i++) {
    let scanner = scanners[i];
    for (const { rot, dist } of transforms[i][0]) {
      scanner = transform(scanner, rot, dist);
    }
    for (const beacon of scanner) {
      beacons.add(beacon.join());
    }
	
  }

  //convert to array
function manhattanDistance(b1,b2) {
  return Math.abs(b1[0] - b2[0]) + Math.abs(b1[1] - b2[1]) + Math.abs(b1[2] - b2[2]);
}

//since we assume first scanner is at 0,0,0
const scannersc = [[0, 0, 0]];
for (let i = 1; i < scanners.length; i++) {
  //for each scanner thats not first
  let scanner = [[0, 0, 0]];

  //transform the scanner with the transform of the first beacon in it
  for (const { rot, dist } of transforms[i][0]) {
    scanner = transform(scanner, rot, dist);
  }
  //push the coords of the transformed scanner to the scanners array
  scannersc.push(scanner[0]);
}
var dists = [];
scannersc.forEach((s1,i1) => {
  scannersc.forEach((s2,i2) => {
    if(i1 == i2) return;
    const dist = manhattanDistance(s1,s2);
    dists.push(dist);
  });
})

console.log(Math.max(...dists));