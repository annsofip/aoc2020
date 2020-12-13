fs = require("fs");

function getPart1(input) {
    const time= input[0];
    const busLines= input[1].split(',').filter((line) =>(line !=='x'));
    return busLines;
}

function getPart2(input) {
    return input;
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
const arr = input.split(/\n/).filter(line => line.length > 0);
//console.log(arr);
//getPart1(arr)
//console.log(getPart1(arr) === 590 ? "Part1 is correct for input" : `expected 590 but was ${getPart1(arr)}`);
//console.log(getPart2(arr) === 42013 ? "Part2 is correct for input" : `expected 42013 but was ${getPart2(arr)}`);
//console.log("PART 1 ", getPart1(arr));

let testData = ["939",
    "7,13,x,x,59,x,31,19"];
console.log("PART 1 ", getPart1(testData));

//console.log(getPart1(testData) === 25 ? "Part1 is correct for testdata" : `expected 25 but was ${getPart1(testData)}`);
//console.log(getPart2(testData) === 286 ? "Part2 is correct for testdata" : `expected 286 but was ${getPart2(testData)}`);
//
