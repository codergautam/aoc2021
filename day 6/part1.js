//read file into array
var fs = require('fs');
var file = fs.readFileSync('input.txt', 'utf8');
var fish = file.split(',');

//convert fish into numbers
fish = fish.map(function(fish) {
    return parseInt(fish);
});

function newFish() {
    fish.push(8);
}

function nextDay() {
//reduce each fish by one
    fish = fish.map(function(fish) {
        return fish - 1;
    })

//for each fish that is 0 or less, remove it
    fish.forEach(function(fishn, index) {
        if (fishn < 0) {
        newFish();
        //set the fish to 6 in the array
            fish[index] = 6;
        }

    })


}

//run 80 days
for (var i = 0; i < 80; i++) {
    //console.log(i)
    nextDay();
}

console.log(fish.length)