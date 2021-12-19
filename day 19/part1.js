const fs = require('fs');

const readFileLines = () =>
fs
	.readFileSync('input.txt')
	.toString('UTF8')
	.split('\n\n');
var scanners = readFileLines().map((scanner)=>scanner.split("\n").slice(1).map(line=>line.split(",").map(Number)));
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
console.log("it will take around 1-2 minutes to solve pls wait")
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
console.log(beacons);
 