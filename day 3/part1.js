//require fs module
var fs = require('fs');

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

var arr =[];
for (var s = 0; s < array.length; s++) {
for (var i = 0; i < 12; i++) {
    arr[i] += array[s].toString().charAt(i);
}
}

//make a new array with a count of how many ones are in each element 
//of the array
var arr2 = [];
var arr3 =[];
for (var i = 0; i < arr.length; i++) {
    var one = 0;
    var zero = 0;
    for (var j = 0; j < arr[i].length; j++) {
        if (arr[i].charAt(j) == '1') {
           one ++
        } else if(arr[i].charAt(j) == '0') {
           zero ++
        }
    }
    if(one > zero) {
        arr2[i] = 1;
        arr3[i] = 0
    } else {
        arr2[i] = 0;
        arr3[i] = 1;
    }
}



//make the array into a string
var str = parseInt(arr2.join(''),2);
var str2 = parseInt(arr3.join(''),2);
//multiply the 2 strings and log output
var output = str * str2;
console.log(output);