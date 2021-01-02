fs = require("fs");

const log = console.log;


function getPart1(input) {
    const cardPubKey = 13233401;
    const doorPubKey = 6552760;
    const denominator = 20201227;

    const rainbowTable = Array(denominator + 1);
    rainbowTable[0] = 1;

    function encrypt(value, subjectNumber) {
        return (value * subjectNumber) % denominator;
    }

    for (let i = 1; i <= denominator; i++) {
        rainbowTable[i] = encrypt(rainbowTable[i - 1], 7);
    }

    const cardLoopSize = rainbowTable.indexOf(cardPubKey);
    const doorLoopSize = rainbowTable.indexOf(doorPubKey);


    for (let i = 1; i <= cardLoopSize; i++) {
        rainbowTable[i] = encrypt(rainbowTable[i - 1], doorPubKey);
    }
    const encryptionKeyDoor = rainbowTable[cardLoopSize];


    for (let i = 1; i <= doorLoopSize; i++) {
        rainbowTable[i] = encrypt(rainbowTable[i - 1], cardPubKey);
    }

    const encryptionKeyCard = rainbowTable[doorLoopSize];

    log({
        cardLoopSize,
        doorLoopSize,
        encryptionKeyDoor,
        encryptionKeyCard
    });

    return encryptionKeyCard;
}

function getPart2(input) {
    return input;

}


const input = fs.readFileSync("./input.txt").toString('utf-8');
const arr = input.split(/\n/).filter(line => line);
console.log("PART 1 ", getPart1(arr));
//console.log("PART 2 ", getPart2(arr));

