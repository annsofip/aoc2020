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
// Requires call stack of at least 1109, can be set by running:  node --stack-size=1109 day22.js
function getPart2(input) {
    let player1 = input[0].split(/\n/).filter(x => x !== '' && x !== 'Player 1:').map(Number);
    let player2 = input[1].split(/\n/).filter(x => x !== '' && x !== 'Player 2:').map(Number);

    function getJoinHand(p1, p2) {
        return 'p1:' + p1.join(',') + ' p2:' + p2.join(',');
    }

    const previousRounds = new Set();
    const endState = gameLoop({
        player1Hand: player1,
        player2Hand: player2,
        round: 1,
        game: 1,
        subGameCount: 0,
        jointHandPreviousRound: getJoinHand(player1, player2),
        previousRounds
    });

   // log(endState);
    return endState.winner === 1 ?
        calcPlayerScore(endState.player1Hand) :
        calcPlayerScore(endState.player2Hand);


    function calcPlayerScore(deck) {
        return deck.reverse().reduce((acc, card, index) => {
            return acc + (index + 1) * card;
        }, 0);
    }

    function getNewState(state, newPlayer1Hand, newPlayer2Hand) {
        return {
            game: state.game,
            subGameCount: state.subGameCount,
            player1Hand: newPlayer1Hand,
            player2Hand: newPlayer2Hand,
            round: state.round + 1,
            jointHandPreviousRound: getJoinHand(newPlayer1Hand, newPlayer2Hand),
            previousRounds: state.previousRounds.add(state.jointHandPreviousRound)
        };
    }

    function gameLoop(state) {
        let player1Hand = state.player1Hand;
        let player2Hand = state.player2Hand;

        if (state.previousRounds.has(state.jointHandPreviousRound)) {
            return {...state, winner: 1};
        }

        if (player1Hand.length === 0 || player2Hand.length === 0) {
            return {...state, winner: player1Hand.length === 0 ? 2 : 1};
        }

        const topCard1 = player1Hand.shift();
        const topCard2 = player2Hand.shift();

        // Has enough cards for Recursive Combat
        if (topCard1 <= player1Hand.length && topCard2 <= player2Hand.length) {

            let newPlayer1Hand = player1Hand.slice(0, topCard1);
            let newPlayer2Hand = player2Hand.slice(0, topCard2);

            const subGameState = gameLoop({
                player1Hand: newPlayer1Hand,
                player2Hand: newPlayer2Hand,
                jointHandPreviousRound: getJoinHand(newPlayer1Hand, newPlayer2Hand),
                round: 1,
                game: state.subGameCount + 1,
                subGameCount: state.subGameCount + 1,
                previousRounds: new Set()
            });

            return subGameState.winner === 1 ?
                gameLoop(getNewState(state, [...player1Hand, topCard1, topCard2], player2Hand)) :
                gameLoop(getNewState(state, player1Hand, [...player2Hand, topCard2, topCard1]));
        }

        return topCard1 > topCard2 ? gameLoop(getNewState(state, [...player1Hand, topCard1, topCard2], player2Hand)) :
            gameLoop(getNewState(state, player1Hand, [...player2Hand, topCard2, topCard1]));

    }
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
const arr = input.split(/\n\n/).filter(line => line);
console.log("PART 1 ", getPart1(arr));
console.log("PART 2 ", getPart2(arr));

//console.log("PART 1 ", getPart1(testData));
//console.log("PART 2 ", getPart2(["2 * 3 + (4 * 5)"]));
