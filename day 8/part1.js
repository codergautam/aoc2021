// Requiring the fs module
let fs = require("fs")

/*
  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg
 */

var digits = ["abcefg", "cf", "acdeg", "acdfg", "bcdf", "abdfg", "abdefg", "acf", "abcdefg", "abcdfg"]

// Creating a function which takes a file as input
const readFileLines = () =>
fs
	.readFileSync('input.txt')
	.toString('UTF8')
	.split('\n');


// Driver code
let arr = readFileLines();

arr = arr.map(x => x.split('|')[1].trim().split(' '));

var acc = 0;
arr.forEach((curr) => {
    curr.forEach((x) => {
        //sort x in alphabetical order
       // var xd = x.split('').sort().join('');
        [1,4,7,8].forEach((i) => {

            if(x.length === digits[i].length) {
                acc++;
              // console.log(x.length, digits[i].length);
            }
        })
    })
})


console.log(acc)