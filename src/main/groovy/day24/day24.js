fs = require("fs");

const log = console.log;

const movements = {
    e: {dx: 1, dy: 0},
    se: {dx: 0, dy: 1},
    sw: {dx: -1, dy: 1},
    w: {dx: -1, dy: 0},
    nw: {dx: 0, dy: -1},
    ne: {dx: 1, dy: -1},
};

function getDayZero(input) {
    const blackTiles = new Map();
    let coordinate;

    for (const line of input) {
        coordinate = {x: 0, y: 0};
        const path = [...line.matchAll(/e|se|sw|w|nw|ne/g)].map(m => m[0]);
        for (const dir of path) {
            coordinate.x += movements[dir].dx;
            coordinate.y += movements[dir].dy;
        }
        let coordinateKey = JSON.stringify(coordinate);
        if (blackTiles.has(coordinateKey)) {
            blackTiles.set(coordinateKey, !blackTiles.get(coordinateKey))
        } else {
            blackTiles.set(coordinateKey, true);
        }
    }
    return blackTiles;
}

function getPart1(input) {
    return [...getDayZero(input).values()].reduce((acc, value) => acc += value, 0);
}

function getPart2(input) {

    function getBlackNeighbors(coordinate, map) {
        let result = [];
        for (const move of Object.values(movements)) {
            const neighbour = {x: 0, y: 0};
            neighbour.x = coordinate.x + move.dx;
            neighbour.y = coordinate.y + move.dy;
            let coordinateKey = JSON.stringify(neighbour);
            if (map.has(coordinateKey) && map.get(coordinateKey)) {
                result.push(neighbour);
            }
        }
        return result;
    }

    function extendWithNeighbors(blackTiles) {
        const newFlipped = new Map(blackTiles);
        for (const tile of blackTiles) {
            for (const move of Object.values(movements)) {
                const coordinate = JSON.parse(tile[0]);
                const neighbour = {x: 0, y: 0};

                neighbour.x = coordinate.x + move.dx;
                neighbour.y = coordinate.y + move.dy;

                if (!blackTiles.has(JSON.stringify(neighbour))) {
                    newFlipped.set(JSON.stringify(neighbour), false);
                }
            }
        }
        return newFlipped;
    }

    let blackTiles = getDayZero(input);

    for (let i = 0; i < 100; i++) {
        const newBlackTiles = new Map();

        blackTiles = extendWithNeighbors(blackTiles);
        for (const [key, isBlack] of blackTiles) {
            const noBlackTiles = getBlackNeighbors(JSON.parse(key), blackTiles).length;

            if (isBlack && (noBlackTiles === 0 || noBlackTiles > 2)) {
                newBlackTiles.set(key, false);
            } else if (!isBlack && noBlackTiles === 2) {
                newBlackTiles.set(key, true);
            } else {
                newBlackTiles.set(key, isBlack);
            }
        }
        blackTiles = newBlackTiles;
    }
    return [...blackTiles.values()].reduce((acc, value) => acc += value, 0);
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
const arr = input.split(/\n/).filter(line => line);
console.log("PART 1", getPart1(arr));
console.log("PART 2 ", getPart2(arr));

//console.log("PART 1 ", getPart1(testData));
//console.log("PART 2 ", getPart2(["2 * 3 + (4 * 5)"]));
