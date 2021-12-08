// Requiring the fs module
let fs = require("fs")

/*
   8:      9:
 aaaa    aaaa    aaaa    aaaa  
b    .  b    .  .    c  b    c 
b    .  b    .  .    c  b    c 
 dddd    dddd    ....    dddd  
.    f  e    f  .    f  e    f 
.    f  e    f  .    f  e    f 
 gggg    gggg    ....    gggg  
 */

 /* convert to
  dddd
e    a
e    a
 ffff
g    b
g    b
 cccc
 */

var digits = ["abcefg", "cf", "acdeg", "acdfg", "bcdf", "abdfg", "abdefg", "acf", "abcdefg", "abcdfg"]

const permutator = (inputArr) => {
    let result = [];
  
    const permute = (arr, m = []) => {
      if (arr.length === 0) {
        result.push(m)
      } else {
        for (let i = 0; i < arr.length; i++) {
          let curr = arr.slice();
          let next = curr.splice(i, 1);
          permute(curr.slice(), m.concat(next))
       }
     }
   }
  
   permute(inputArr)
  
   return result;
  }

//convert
const mapIt = (str, conversions) => {
var newStr = ""
for (let i = 0; i < str.length; i++) {
    newStr += conversions[str[i]]
}
return newStr
}

//convert each key in object to alphabetical order
const convertToAlphabetical = (obj) => {
    let newObj = {}
    for (let key in obj) {
        let newKey = key.split("").sort().join("")
        newObj[newKey] = obj[key]
    }
    return newObj
}

function getNumbers(input ,mappedInput) {
    var result = {}
    input.split(" ").forEach((word,i) => {
        var mappedWord = mappedInput[i]
        result[word] = digits.indexOf(mappedWord.split("").sort().join(""))
    })
    return result;
}

function checkIfValid(mappedInput) {
    return mappedInput.every(digit => {
        return digits.includes(digit.split("").sort().join(""))
    })
}


// Creating a function which takes a file as input
const readFileLines = () =>
fs
	.readFileSync('input.txt')
	.toString('UTF8')
	.split('\n');

function findMap(input) {  
    var letters = ["a", "b", "c", "d", "e", "f", "g"]
    var permutations = permutator(letters)
    //for permutations
    for (let i = 0; i < permutations.length; i++) {
        let map = {}
        var permutation = permutations[i]
        permutation.forEach((char, index) => {
            map[letters[index]] = char
        })

        var mappedInput = input.split(" ").map(word => mapIt(word, map))
        if(checkIfValid(mappedInput)) {
            return getNumbers(input, mappedInput)
        }
    }
}
//console.log(findMap("acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab", "cdfeb fcadb cdfeb cdbaf"))

// Driver code
let arr = readFileLines();
var arr0 = arr.map(x => x.split('|')[0].trim().split(' '));
var arr1 = arr.map(x => x.split('|')[1].trim().split(' '));

var acc = 0;
arr1.forEach((curr, index) => {
    var inputs = arr0[index]
    var count = '';
    var map = findMap(inputs.join(" "))
    //convert the keys to alphabetical order
    map = convertToAlphabetical(map)
    
    //find the count
    for (let i = 0; i < curr.length; i++) {
        var word = curr[i].split("").sort().join("")
        count += map[word]
    }
    acc += parseInt(count)
})


console.log(acc)
