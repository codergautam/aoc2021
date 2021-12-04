var fs = require("fs")
var numbers = [25,8,32,53,22,94,55,80,33,4,63,14,60,95,31,89,30,5,47,66,84,70,17,74,99,82,21,35,64,2,76,9,90,56,78,28,51,86,49,98,29,96,23,58,52,75,41,50,13,72,92,83,62,37,18,11,34,71,91,85,27,12,24,73,7,77,10,93,15,61,3,46,16,97,1,57,65,40,0,48,69,6,20,68,19,45,42,79,88,44,26,38,36,54,81,59,43,87,39,67];

//read the file board.txt, and store the contents in a variable called board
var board = fs.readFileSync('boards.txt', 'utf8');

var bingoes = 0;


//split the board into an array of 2 dimensional arrays
var boardArray = board.split('\n\n');

//convert each string in the array to a 2 dimensional array of numbers
for (var i = 0; i < boardArray.length; i++) {
    var board = boardArray[i].split('\n')

    //convert the board to an array of numbers
    for (var j = 0; j < board.length; j++) {
        board[j] = board[j].trim().replace(/\s\s+/g, ' ').split(' ').map(Number);
    }
   // board.splice(board.length - 1, 1);
    boardArray[i] = board
}

//ok now its bingo time

var stop = false;

numbers.forEach(function(number) {
    if(stop) return;
    //check each board
    for (var i = boardArray.length-1; i >= 0; i--) {
        var board = boardArray[i]
        //check each row
        for (var j = 0; j < board.length; j++) {
            var row = board[j]
            if (row.indexOf(number) != -1) {
                //number is in row
                row[row.indexOf(number)] = 'X'
            }
        }
     

        //check if bingo
        var bingo = false
        for (var j = 0; j < board.length; j++) {
            var row = board[j]
            if (row.every( v => v === 'X' )) {
                bingo = true

            }
        }

        //column check
        for (var j = 0; j < board.length; j++) {
            var column = []
            for (var k = 0; k < board.length; k++) {
                column.push(board[k][j])
            }
            if (column.every( v => v === 'X' )) {
                if(!bingo) {
                    bingo = true
                }
            }
        }

        if(boardArray.length == 1) {
console.log(board)
            //oh shi we may have found it
            var sum = 0
            for (var j = 0; j < board.length; j++) {
                for (var k = 0; k < board.length; k++) {
                    if(board[j][k] != 'X') {
                        sum += board[j][k]
                    }
                }
            }
            console.log(sum*number)
        stop = true;
                }
        if(bingo) {
            boardArray.splice(i, 1);
        }

    }

})
