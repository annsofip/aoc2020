fs = require("fs");


const log = console.log;

function getPart1(input) {
    const startTime = new Date();
    let map = new Map();
    input.forEach((row, y) => {
        row.forEach((value, x) => {
            map.set(`${x},${y},0`, value === '#');
        });
    });


    function getNeighbors([x, y, z], map) {
        let result = [];
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                for (let k = z - 1; k <= z + 1; k++) {
                    if (!(i === x && j === y && k === z)) {
                        const key = `${i},${j},${k}`;
                        if (map.has(key)) {
                            result.push(map.get(key));
                        }
                    }
                }

            }
        }
        return result;
    }

    for (let i = 0; i < 6; i++) {
        const tempMap = new Map();
        let xMin = yMin = zMin = xMax = yMax = zMax = 0;
        [...map].forEach(([key, value]) => {
            const [x, y, z] = key.split(',').map(Number);
            if (x < xMin) xMin = x;
            if (y < yMin) yMin = y;
            if (z < zMin) zMin = z;
            if (x > xMax) xMax = x;
            if (y > yMax) yMax = y;
            if (z > zMax) zMax = z;
        });


        for (let x = xMin - 1; x <= xMax + 1; x++) {
            for (let y = yMin - 1; y <= yMax + 1; y++) {
                for (let z = zMin - 1; z <= yMax + 1; z++) {
                    const key = `${x},${y},${z}`;
                    const isActive = map.has(key) ? map.get(key) : false;
                    const activeNeighbors = getNeighbors([x, y, z], map).filter(v => v).length;
                    if (isActive && (activeNeighbors === 2 || activeNeighbors === 3)) {
                        tempMap.set(key, isActive);
                    } else if (!isActive && (activeNeighbors === 3)) {
                        tempMap.set(key, true);
                    } else {
                        tempMap.set(key, false);
                    }
                }
            }
        }
        map = tempMap;
    }

    const result = [...map].reduce((acc, e) => {
        return acc += (e[1] ? 1 : 0);
    }, 0);

    const endTime = new Date();
    console.log(`## Took ${Math.round((endTime.getTime() - startTime.getTime()))} milliseconds`);
    return result;
}

function getPart2(input) {
    const startTime = new Date();
    let map = new Map();
    input.forEach((row, y) => {
        row.forEach((value, x) => {
            map.set(`${x},${y},0,0`, value === '#');
        });
    });

    function getNeighbors([x, y, z, w], map) {
        let result = [];
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                for (let k = z - 1; k <= z + 1; k++) {
                    for (let l = w - 1; l <= w + 1; l++) {
                        if (!(i === x && j === y && k === z && l == w)) {
                            const key = `${i},${j},${k},${l}`;
                            if (map.has(key)) {
                                result.push(map.get(key));
                            }
                        }
                    }

                }
            }
        }
        return result;
    }

    for (let i = 0; i < 6; i++) {
        const tempMap = new Map();
        let xMin = yMin = zMin = wMin = xMax = yMax = zMax = wMax = 0;
        [...map].forEach(([key, value]) => {
            const [x, y, z, w] = key.split(',').map(Number);
            if (x < xMin) xMin = x;
            if (y < yMin) yMin = y;
            if (z < zMin) zMin = z;
            if (w < wMin) wMin = w;
            if (x > xMax) xMax = x;
            if (y > yMax) yMax = y;
            if (z > zMax) zMax = z;
            if (w > wMax) wMax = w;
        });


        for (let x = xMin - 1; x <= xMax + 1; x++) {
            for (let y = yMin - 1; y <= yMax + 1; y++) {
                for (let z = zMin - 1; z <= yMax + 1; z++) {
                    for (let w = wMin - 1; w <= wMax + 1; w++) {
                        const key = `${x},${y},${z},${w}`;
                        const isActive = map.has(key) ? map.get(key) : false;
                        const activeNeighbors = getNeighbors([x, y, z, w], map).filter(v => v).length;
                        if (isActive && (activeNeighbors === 2 || activeNeighbors === 3)) {
                            tempMap.set(key, isActive);
                        } else if (!isActive && (activeNeighbors === 3)) {
                            tempMap.set(key, true);
                        } else {
                            tempMap.set(key, false);
                        }

                    }
                }
            }
        }
        map = tempMap;
    }

    const result = [...map].reduce((acc, e) => {
        return acc += (e[1] ? 1 : 0);
    }, 0);
    const endTime = new Date();
    console.log(`## Took ${Math.round((endTime.getTime() - startTime.getTime()) / 1000)} seconds`)
    return result;
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
const arr = input.split(/\n/).filter(line => line.length > 0).map(x => x.split(''));
console.log("PART 1:", getPart1(arr));
console.log("PART 2:", getPart2(arr));

