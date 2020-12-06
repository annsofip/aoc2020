fs = require("fs");

function getPart1(input) {
    return input.length
}

function getPart2(input) {
    return input.length
}

const input = fs.readFileSync("./input.txt").toString('utf-8');
const arr = input.split(/\n\n/);
//console.log(arr);
console.log(getPart1(arr));
console.log(getPart2(arr));

