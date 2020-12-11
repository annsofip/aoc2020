fs = require("fs");


String.prototype.count = function (s1) {
    return (this.length - this.replace(new RegExp(s1, "g"), '').length) / s1.length;
};

function getPart1(input) {
    const wall = Array(input[0].length + 2).fill('W');
    let seatingGrid = input.map((row) => {
        return ['W'].concat(row.split('')).concat(['W']);
    });
    seatingGrid.push(wall);
    seatingGrid.unshift(wall);

    // printSeating(seatingGrid);
//    console.log("----------------");
    let newSeatingGrid = JSON.parse(JSON.stringify(seatingGrid));
    while (true) {
        let change = false;
        for (let y = 1; y < seatingGrid.length - 1; y++) {
            for (let x = 1; x < seatingGrid[0].length - 1; x++) {
                const row1 = seatingGrid[y - 1][x - 1] + seatingGrid[y - 1][x] + seatingGrid[y - 1][x + 1];
                const row2 = seatingGrid[y][x - 1] + " " + seatingGrid[y][x + 1];
                const row3 = seatingGrid[y + 1][x - 1] + seatingGrid[y + 1][x] + seatingGrid[y + 1][x + 1];
//
                const value = seatingGrid[y][x];
                const noSeatAdjacentOccupied = (row1 + row2 + row3).count('#');
                const newValue = (value === 'L') && noSeatAdjacentOccupied === 0 ? '#' : value === '#' && noSeatAdjacentOccupied >= 5 ? 'L' : value;

                newSeatingGrid[y][x] = newValue;
                change = change || !(newValue === value);
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

function getPart2(input) {
    const wall = Array(input[0].length + 2).fill('W');
    let seatingGrid = input.map((row) => {
        return ['W'].concat(row.split('')).concat(['W']);
    });
    seatingGrid.push(wall);
    seatingGrid.unshift(wall);
    //   printSeating(seatingGrid);

    const directions = [[1, 1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [-1, -1]];
    let newSeatingGrid = JSON.parse(JSON.stringify(seatingGrid));

    function findInDirection([x, y], [dx, dy]) {
        if (seatingGrid[y + dy][x + dx] === '.') {
            return findInDirection([x + dx, y + dy], [dx, dy]);
        }
        return seatingGrid[y + dy][x + dx];
    }

    function find([x, y]) {
        let search = "";
        for (let d = 0; d < directions.length; d++) {
            search += findInDirection([x, y], directions[d]);
        }
        return search;
    }

    while (true) {
        let change = false;
        for (let y = 1; y < seatingGrid.length - 1; y++) {
            for (let x = 1; x < seatingGrid[0].length - 1; x++) {

                const value = seatingGrid[y][x];
                let newValue = "";
                if (value === '.') {
                    newValue = value;
                } else {
                  const  noSeatAdjacentOccupied = find([x, y]).count('#');
                    newValue = (value === 'L') && noSeatAdjacentOccupied === 0 ? '#' : value === '#' && noSeatAdjacentOccupied >= 5 ? 'L' : value;
                    newSeatingGrid[y][x] = newValue;
                    change = change || !(newValue === value);
                }

            }
        }
        //  printSeating(newSeatingGrid);
        if (change) {
            seatingGrid = JSON.parse(JSON.stringify(newSeatingGrid));
        } else {
            return newSeatingGrid.map((row) => (row.join(''))).join('').count('#');
        }
    }
}

function print(toPrint) {
    if (debug) {
        console.log(toPrint);
    }

}

const debug = true;
const input = fs.readFileSync("./input.txt").toString('utf-8');
const arr = input.split(/\n/).filter(line => line.length > 0)
//console.log(arr);
console.log("PART 1:", getPart1(arr));
console.log("PART 2:", getPart2(arr));

