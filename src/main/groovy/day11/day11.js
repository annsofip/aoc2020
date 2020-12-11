fs = require("fs");
_ = require("lodash");


String.prototype.count = function (s1) {
    return (this.length - this.replace(new RegExp(s1, "g"), '').length) / s1.length;
};

function getPart1(input) {
    function findInDirection(seatingGrid, [x, y], [dx, dy]) {
        return seatingGrid[y + dy][x + dx];
    }

    return getOccupiedSeats(input, findInDirection, 4);
}

function getPart2(input) {
    function findInDirection(seatingGrid, [x, y], [dx, dy]) {
        if (seatingGrid[y + dy][x + dx] === '.') {
            return findInDirection(seatingGrid, [x + dx, y + dy], [dx, dy]);
        }
        return seatingGrid[y + dy][x + dx];
    }

    return getOccupiedSeats(input, findInDirection, 5);
}

function getOccupiedSeats(input, findInDirection, maxOccupied) {
    let seatingGrid = [Array(input[0].length + 2).fill('W')].concat(input.map((row) => {
        return ['W'].concat(row.split('')).concat(['W']);
    })).concat([Array(input[0].length + 2).fill('W')]);

    function findNoOfAdjacentOccupiedSeats([x, y]) {
        return [[1, 1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [-1, -1]].reduce((acc, dir) => (
            acc + findInDirection(seatingGrid, [x, y], dir)
        ), 0).count('#');
    }

    let newSeatingGrid = JSON.parse(JSON.stringify(seatingGrid));
    while (true) {
        let change = false;
        for (let y = 1; y < seatingGrid.length - 1; y++) {
            for (let x = 1; x < seatingGrid[0].length - 1; x++) {
                const value = seatingGrid[y][x];
                if (value !== '.') {
                    const occupiedSeats = findNoOfAdjacentOccupiedSeats([x, y]);
                    newSeatingGrid[y][x] = (value === 'L') && occupiedSeats === 0 ? '#' : value === '#' && occupiedSeats >= maxOccupied ? 'L' : value;
                    change = change || !(newSeatingGrid[y][x] === value);
                }

            }
        }
        if (change) {
            seatingGrid = JSON.parse(JSON.stringify(newSeatingGrid));
        } else {
            return newSeatingGrid.map((row) => (row.join(''))).join('').count('#');
        }
    }
}

function printSeating(seatingGrid) {
    console.log("------------------")
    seatingGrid.forEach((row) => (console.log(row.filter((space) => space !== 'W').join(''))));
}


const debug = true;
const input = fs.readFileSync("./input.txt").toString('utf-8');
const arr = input.split(/\n/).filter(line => line.length > 0);
//console.log(arr);
console.log(getPart1(arr) === 2481 ? "Part1 is correct for input" : `expected 2481 but was ${getPart1(arr)}`);
console.log(getPart2(arr) === 2227 ? "Part2 is correct for input" : `expected 2227 but was ${getPart2(arr)}`);

const testData = [
    "L.LL.LL.LL",
    "LLLLLLL.LL",
    "L.L.L..L..",
    "LLLL.LL.LL",
    "L.LL.LL.LL",
    "L.LLLLL.LL",
    "..L.L.....",
    "LLLLLLLLLL",
    "L.LLLLLL.L",
    "L.LLLLL.LL",
];

console.log(getPart1(testData) === 37 ? "Part1 is correct for testdata" : `expected 37 but was ${getPart1(testData)}`);
console.log(getPart2(testData) === 26 ? "Part2 is correct for testdata" : `expected 26 but was ${getPart2(testData)}`);
