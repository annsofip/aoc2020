fs = require("fs");

const log = console.log;

function reverse(el) {
    return el.split('').reverse().join('');
}


function getPart1(input) {
    function getBorders(tile) {
        const north = tile[0];
        const south = tile[tile.length - 1];
        const east = tile.map(t => t[0]).join('');
        const west = tile.map(t => (t[t.length - 1])).join('');

        return [north, south, west, east, reverse(north), reverse(south), reverse(east), reverse(west)];

    }


    const tiles = input.map(row => {
        const tile = row.split(/\n/).filter(x => x);

        const id = parseInt(/(\d+)/.exec(tile[0])[0]);
        tile.shift()
        return {
            id: id,
            matches: [],
            borders: getBorders(tile)
        };
    });


    function findMatches(tile1, tile2) {
        for (let i = 0; i < tile1.borders.length; i++) {
            const border1 = tile1.borders[i];
            for (let j = 0; j < tile2.borders.length; j++) {
                const border2 = tile2.borders[j];
                if (border1 === border2) {
                    return border1;
                }
            }
        }
        return null;
    }

    for (let i = 0; i < tiles.length; i++) {
        const tile1 = tiles[i];
        for (let j = i + 1; j < tiles.length; j++) {
            const tile2 = tiles[j];

            const match = findMatches(tile1, tile2);

            if (match) {
                tile1.matches.push({border: match, id: tile2.id});
                tile2.matches.push({border: match, id: tile1.id});
            }
        }
    }

 //   log(tiles);
 //   tiles.forEach(tile => {
 //       log({id: tile.id, matches: tile.matches})
 //   });

//    log(tiles.filter(tile => (tile.matches.length === 2)))
    return tiles.filter(tile => (tile.matches.length === 2)).map(tile => tile.id).reduce((acc, id) => (acc * id), 1);
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
