var fs = require('fs');

var file = fs.readFileSync('input.txt', 'utf8');

var distances = [];

function sequenceSum(b, e, step){
    var dist = Math.abs(b-e)
    
    var sum = 0
    for (var i = 0; i <= dist; i++) {
        sum += i
    }
    return sum
     };

for (let index = 0; index < file.split(',').length; index++) {
    var distance = 0;
    file.split(',').forEach(function(hpos) {
        var hpos = parseInt(hpos);
        
        distance+=sequenceSum(hpos, index, 1);
    })
   distances.push([index, distance])
    
}

//sort by distance
distances.sort(function(a,b){
    return a[1]-b[1]
})

console.log(distances[0][1])




