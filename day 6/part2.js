//read file into array
var fs = require('fs');

var file = fs.readFileSync('input.txt', 'utf8');
var fishes = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0};

//put fishes in file into the object
//split the file into an array
file.split(',').forEach(function(fishn) {
    fishes[fishn]++;
});

//store object in store.txt
fs.writeFileSync('store.txt', JSON.stringify(fishes));


function nextDay() {
//read store.txt into object
var store = fs.readFileSync('store.txt', 'utf8');
var fish = JSON.parse(store);


var newFish = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0};
for (var key in fish) {
    if(key == 0) {
       newFish[6] += fish[key];
       newFish[8] += fish[key];
    } else {
        newFish[key-1] += fish[key];
    }
}

//write object to store.txt
fs.writeFileSync('store.txt', JSON.stringify(newFish));
}

//run 80 days
for (var i = 0; i < 256; i++) {
    //console.log(i)
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
    nextDay();

}

//add up the fish
//read object
var store = fs.readFileSync('store.txt', 'utf8');
var fish = JSON.parse(store);

var total = fish[0] + fish[1] + fish[2] + fish[3] + fish[4] + fish[5] + fish[6] + fish[7] + fish[8];
console.log(total);