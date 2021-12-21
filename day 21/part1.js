//lol i was too lazy to make a parser, input[0] is player 1 and input[1] is player 2
var input = [9, 10]

var p1Score = 0;
var p2Score = 0;

var p1Pos = input[0];
var p2Pos = input[1];

var lastDie = 0;
var rolls = 0;
function roll() {
  lastDie++;
  if (lastDie > 100) lastDie = lastDie % 100;
  rolls++;
  return lastDie;
}

var turn = 1;

while (p1Score < 1000 && p2Score < 1000) {
  //roll 3 times and sum
  var rolled = roll() + roll() + roll();
  if (turn == 1) {

    p1Pos += rolled - 1;
    if (p1Pos > 10) p1Pos = (p1Pos % 10);
    p1Pos++;
    p1Score += p1Pos;

    //console.log("Player 1 rolls", rolled, "and moves to", p1Pos, "with a score of", p1Score);
  } else {
    p2Pos += rolled - 1;
    if (p2Pos > 10) p2Pos = (p2Pos % 10);
    p2Pos++;
    p2Score += p2Pos;

    //	console.log("Player 2 rolls", rolled, "and moves to", p2Pos, "with a score of", p2Score);
  }
  turn = turn == 1 ? 2 : 1;
}

var losingPlayerPoints = Math.min(p1Score, p2Score);
console.log(losingPlayerPoints * rolls)
