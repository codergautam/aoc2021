// Requiring the fs module
let fs = require("fs")

// Creating a function which takes a file as input
const readFileLines = () =>
fs
	.readFileSync('file.txt')
	.toString('UTF8')
	.split('\n');


// Driver code
let arr = readFileLines();

//main logic

var increase = 1;
arr.forEach((item, index) => {
  //if first item it doesnt count
  if(index == 0) return

  //find previous item, then if current item is greater than previous increase by 1
  var previousItem = arr[index-1]
  if(item > previousItem) increase += 1

  console.log(previousItem +">"+ item)
})

console.log(increase)
