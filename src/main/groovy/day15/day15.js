fs = require("fs");


function getPart1(input) {
    let startTime = new Date();
    const startingNumbers = input.split(',').map(Number);
    let saidNumbers = [...startingNumbers];

    for (let i = saidNumbers.length; i < 2020; i++) {
        const lastNumber = saidNumbers[saidNumbers.length - 1];
        const numSaidBefore = saidNumbers.reduce(function (a, e, i) {
            if (e === lastNumber && i < saidNumbers.length - 1)
                a.push(i);
            return a;
        }, []);
        const lastSaidIndex = numSaidBefore[numSaidBefore.length - 1];

        const diff = (i) - (lastSaidIndex + 1);
        saidNumbers[i] = numSaidBefore.length > 0 && lastSaidIndex !== i - 1 ? diff : 0;
    }
    let endTime = new Date();
    console.log(`Took ${Math.round((endTime.getTime() - startTime.getTime()))} milliseconds`)

    return saidNumbers[saidNumbers.length - 1]
}

function getPart2(input) {

    let startTime = new Date();
    const startingNumbers = input.split(',').map(Number);

    const lastSaid = new Map();
    startingNumbers.forEach((num, i) => (lastSaid.set(num, i)));

    let previousNumber = startingNumbers[startingNumbers.length - 1];
    let previousIndex = startingNumbers.length - 1;
    let previousNumberLastIndex;
    for (let i = startingNumbers.length; i < 30000000; i++) {
        let thisNumber = previousNumberLastIndex !== undefined ? (i - 1) - previousNumberLastIndex : 0;
        previousNumber = thisNumber;
        previousIndex = i;
        previousNumberLastIndex = lastSaid.get(thisNumber);
        lastSaid.set(thisNumber, i);

    }
    let endTime = new Date();
    console.log(`Took ${Math.round((endTime.getTime() - startTime.getTime()) / 1000)} seconds`)
    return previousNumber
}


console.log("PART 1 ", getPart1("0,12,6,13,20,1,17"));
console.log("PART 2 ", getPart2("0,12,6,13,20,1,17"));
