fs = require("fs");

const log = console.log;

function reverse(el) {
    return el.split('').reverse().join('');
}


function getPart1(input, noMoves) {


    function getDestination(state, cupsAfterPickUp) {
        let i = 1;
        while (i <= 3) {
            let d = (state.cups[(state.currentIndex)] - i);
            if (d < Math.min(...cupsAfterPickUp)) {
                return Math.max(...cupsAfterPickUp);
            }
            if (cupsAfterPickUp.includes(d)) {
                return d;
            }
            i++;
        }
    }

    function rotate(arr, offset) {
        return arr.slice(offset).concat(arr.slice(0, offset));
    }

    function gameLoop(state, noMoves) {
        if (state.move === noMoves + 1) {
            return state;
        }

        const pickUpIndex = [1, 2, 3].map((offset) => ((state.currentIndex + offset) % 9));
        const pickUp = pickUpIndex.map((index) => state.cups[index]);
        const cupsAfterPickUp = state.cups.filter(cup => (!pickUp.includes(cup)));

        const destination = getDestination(state, cupsAfterPickUp);
        const destinationIndex = cupsAfterPickUp.indexOf(destination) + 1;

        const newCups = cupsAfterPickUp.slice(0, destinationIndex).concat(pickUp).concat(cupsAfterPickUp.slice(destinationIndex))
        const offset = newCups.indexOf(state.cups[state.currentIndex]) - state.cups.indexOf(state.cups[state.currentIndex]);

        //    log({
        //        move: state.move,
        //        cups: state.cups.map((cup, i) => (i === state.currentIndex) ? `(${cup})` : cup).join(' '),
        //        pickUp,
        //        destination
        //    });

        return gameLoop({
            cups: rotate(newCups, offset),
            currentIndex: ++state.currentIndex % 9,
            move: ++state.move,
        }, noMoves);
    }


    const state = {cups: input.split('').map(Number), currentIndex: 0, move: 1};
    const finalState = gameLoop(state, noMoves);


    return rotate(finalState.cups, finalState.cups.indexOf(1)).slice(1).join('');
}

function getPart2(input) {
    return input;

}


//console.log("PART 1 ", getPart1('389125467', 10) ==='92658374');
//console.log("PART 1 ", getPart1('389125467', 100) ==='67384529');
console.log("PART 1 ", getPart1('193467258', 100));
//console.log("PART 2 ", getPart2(arr));

//console.log("PART 2 ", getPart2(["2 * 3 + (4 * 5)"]));
