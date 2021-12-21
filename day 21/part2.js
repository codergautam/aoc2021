//lol i was too lazy to make a parser, input[0] is player 1 and input[1] is player 2
var input = [9,10]


//create a map of the dice and outcomes, so we done have to calculate it for each dimension
var diceMap = {};
for (let diceOne = 1; diceOne <= 3; diceOne++) {
  for (let diceTwo = 1; diceTwo <= 3; diceTwo++) {
    for (let diceThree = 1; diceThree <= 3; diceThree++) {
      var outcome = diceOne + diceTwo + diceThree
      if (!diceMap.hasOwnProperty(outcome)) diceMap[outcome] = 0
      diceMap[outcome]++;
    }
  }
}
var outcomes = Object.keys(diceMap).map(Number)
var maxOutcome = Math.max(...outcomes)
var minOutcome = Math.min(...outcomes)

function quantum(p1, p2, turn = 1) {
  const currPlayer = turn ? p1 : p2;

  if (p1.score >= 21) return 1;
  if (p2.score >= 21) return 0;

  let sum = 0;

  //i first tried doing each dice roll manually but that was terrible on performance
  //since we created a map of combinations we can easily multiply instead of calculating each one manually
  for (let outcome = minOutcome; outcome <= maxOutcome; outcome++) {

    const oldPos = currPlayer.pos;
    const oldScore = currPlayer.score;

    currPlayer.pos = ((currPlayer.pos - 1 + outcome) % 10) + 1;
    currPlayer.score += currPlayer.pos;

    sum += diceMap[outcome] * quantum(p1, p2, !turn);

    currPlayer.pos = oldPos;
    currPlayer.score = oldScore;
  }

  return sum;
}

console.log(quantum({ score: 0, pos: input[0] }, { score: 0, pos: input[1] }))