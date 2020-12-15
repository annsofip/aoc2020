fs = require("fs");

function getPart1(input) {
    let directions = ['N', 'E', 'S', 'W'];
    let current = 1;

    let shipPos = {
        northSouth: 0,
        eastWest: 0
    };

    for (let i = 0; i < input.length; i++) {
        const split = /([\w])(\d+)/g.exec(input[i]);
        let action = split[1];
        const value = parseInt(split[2]);


        if (action === 'F') {
            action = directions[current];
        }

        if (action === 'N') {
            shipPos.northSouth += value;
        } else if (action === 'S') {
            shipPos.northSouth -= value;
        } else if (action === 'E') {
            shipPos.eastWest -= value;
        } else if (action === 'W') {
            shipPos.eastWest += value;
        } else if (action === 'L') {
            current = ([270, 180, 90].indexOf(value) + current + 1) % 4;
        } else if (action === 'R') {
            current = ([90, 180, 270].indexOf(value) + current + 1) % 4;
        }

    }
    return Math.abs(shipPos.northSouth) + Math.abs(shipPos.eastWest);
}

function getPart2(input) {
    let shipPos = {
        northSouth: 0,
        eastWest: 0
    };
    let waypoint = {
        northSouth: 1,
        eastWest: 10
    };

    for (let i = 0; i < input.length; i++) {
        const split = /([\w])(\d+)/g.exec(input[i]);
        let action = split[1];
        const value = parseInt(split[2]);

        const northSouth = waypoint.northSouth;
        const eastWest = waypoint.eastWest;

        if (action === 'F') {
            shipPos.northSouth += value * northSouth;
            shipPos.eastWest += value * eastWest;

        } else if (action === 'N') {
            waypoint.northSouth += value;
        } else if (action === 'S') {
            waypoint.northSouth -= value;
        } else if (action === 'E') {
            waypoint.eastWest += value;
        } else if (action === 'W') {
            waypoint.eastWest -= value;
        } else if (action === 'L' || action === 'R') {
            if ((action === 'L' && value === 90) || (action === 'R' && value === 270)) {
                waypoint.northSouth = eastWest;
                waypoint.eastWest = -northSouth;
            } else if ((action === 'R' && value === 90) || (action === 'L' && value === 270)) {
                waypoint.northSouth = -eastWest;
                waypoint.eastWest = northSouth;
            } else {
                waypoint.northSouth = -northSouth;
                waypoint.eastWest = -eastWest;

            }
        }
    }
    return Math.abs(shipPos.northSouth) + Math.abs(shipPos.eastWest);
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
const arr = input.split(/\n/).filter(line => line.length > 0);

console.log(getPart1(arr) === 590 ? "Part1 is correct for input" : `expected 590 but was ${getPart1(arr)}`);
console.log(getPart2(arr) === 42013 ? "Part2 is correct for input" : `expected 42013 but was ${getPart2(arr)}`);

const testData = [
    "F10",
    "N3",
    "F7",
    "R90",
    "F11"
];

//console.log(getPart2(testData2));
console.log(getPart1(testData) === 25 ? "Part1 is correct for testdata" : `expected 25 but was ${getPart1(testData)}`);
console.log(getPart2(testData) === 286 ? "Part2 is correct for testdata" : `expected 286 but was ${getPart2(testData)}`);
