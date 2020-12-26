fs = require("fs");

const log = console.log;

function getPart1(input) {
    let player1 = input[0].split(/\n/).filter(x => x !== '' && x !== 'Player 1:').map(Number);
    let player2 = input[1].split(/\n/).filter(x => x !== '' && x !== 'Player 2:').map(Number);
    const endState = gameLoop({
        player1Hand: player1,
        player2Hand: player2,
        round: 0
    });
    //log(endState);

    return endState.player1Hand.length > 0 ?
        calcPlayerScore(endState.player1Hand) :
        calcPlayerScore(endState.player2Hand);


    function calcPlayerScore(deck) {
        return deck.reverse().reduce((acc, card, index) => {
            return acc + (index + 1) * card;
        }, 0);
    }

    function gameLoop(state) {
        let player1Hand = state.player1Hand;
        let player2Hand = state.player2Hand;

        if (player1Hand.length === 0 || player2Hand.length === 0) {
            return state;
        }
        const topCard1 = player1Hand.shift();
        const topCard2 = player2Hand.shift();

        if (topCard1 > topCard2) {
            return gameLoop({
                player1Hand: [...player1Hand, topCard1, topCard2],
                player2Hand: player2Hand,
                round: ++state.round
            });
        } else {
            return gameLoop({
                player1Hand: player1Hand,
                player2Hand: [...player2Hand, topCard2, topCard1],
                round: ++state.round
            });
        }
    }
}

function getPart2(input) {
    return input;

}


const input = fs.readFileSync("./input.txt").toString('utf-8');
const arr = input.split(/\n\n/).filter(line => line);
console.log("PART 1 ", getPart1(arr));
//console.log("PART 2 ", getPart2(arr));

//console.log("PART 1 ", getPart1(testData));
//console.log("PART 2 ", getPart2(["2 * 3 + (4 * 5)"]));
