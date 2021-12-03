//require fs module
var fs = require('fs');


String.prototype.count=function(s1) { 
    return (this.length - this.replace(new RegExp(s1,"g"), '').length) / s1.length;
}

//Create a function which takes file as input and returns an array
function readFile(file) {
    var data = fs.readFileSync(file, 'utf8');
    var array = data.split('\n');
    //convert array into array of numbers
    return array;
}

//Read file file.txt
var array = readFile('input.txt');

//make an array of only the first elements of the array
//for 12 times


//make a new array with a count of how many ones are in each element 
//of the array

for (var i = 0; i < 12; i++) {
  var charsarr = array.map((el) => el[i]).join('')
  console.log(charsarr)

    var one = charsarr.count('1');
    var zero = charsarr.count('0');

    var consideredpos = 0
    if(one > zero) {
       consideredpos = 1;
    } else if(zero > one) {
       consideredpos = 0;
    } else if(zero == one) {
        consideredpos = 1;
    }
    console.log("zeros " + zero + " ones " + one + " consideredpos " + consideredpos)
  console.log(array)
   array = array.filter((element) => element.charAt(i) == consideredpos)

}
console.log(parseInt(array[0],2))

