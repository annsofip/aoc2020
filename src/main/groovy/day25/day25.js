fs = require("fs");

const log = console.log;

function reverse(el) {
    return el.split('').reverse().join('');
}


function getPart1(input) {
    return input;
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
