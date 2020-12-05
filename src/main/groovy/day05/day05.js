fs = require("fs");


function getBoardingPasses(lines) {
    return lines.map(line => {
        const row = parseInt(line.substring(0, 7).replace(/F/g, 0).replace(/B/g, 1), 2);
        const col = parseInt(line.substring(7).replace(/L/g, 0).replace(/R/g, 1), 2);
        return row * 8 + col;
    }).sort((num1, num2) => num1 - num2);
}

function getPart1(lines) {
    const boardingPasses = getBoardingPasses(lines);
    return boardingPasses[boardingPasses.length - 1]
}

function getPart2(lines) {
    const boardingPasses = getBoardingPasses(lines);
    return boardingPasses.find(boardingPass => !boardingPasses.includes(boardingPass +1))
}

const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input.split("\n").filter(line => line.length > 0);
//console.log(arr);
console.log(getPart1(arr));
console.log(getPart2(arr));


//console.log("TEST: ", getPart1(["FBFBBFFRLR"]))
