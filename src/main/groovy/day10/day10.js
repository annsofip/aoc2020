fs = require("fs");


function getPart1(input) {
    input.push(Math.max.apply(Math, input) + 3);
    let jolt = 0;
    let joltsDiff = [];
    input.forEach(function (adapter) {
        if (adapter - jolt <= 3 && adapter - jolt > 0) {
            joltsDiff.push(adapter - jolt);
            jolt = adapter;
        }
    });
    let noOnes = joltsDiff.reduce(function (acc, jolt) {
        return acc + (jolt === 1 ? 1 : 0)
    }, 0);
    let noThrees = joltsDiff.reduce(function (acc, jolt) {
        return acc + (jolt === 3 ? 1 : 0)
    }, 0);

    return noOnes * noThrees
}


function getPart2(input) {

    const adapters = input.map(jolts => ({
        jolts: jolts,
        noPossibleWays: null,
        usefulAdapters: []
    }));

    for (const a of adapters) {
        a.usefulAdapters = adapters.filter(function (adapter) {
            return a.jolts && (adapter.jolts - a.jolts <= 3) && (adapter.jolts - a.jolts > 0);
        });
    }
    const deviceJolts = adapters[adapters.length - 1].jolts + 3;


    function countSolution(adapter) {
        if (adapter.noPossibleWays === null) {
            if (adapter.usefulAdapters.length === 0) {
                adapter.noPossibleWays = (deviceJolts - adapter.jolts === 3) ? 1 : 0;

            } else {
                adapter.noPossibleWays = adapter.usefulAdapters.reduce((count, adapter) => (count + countSolution(adapter)), 0)
            }
        }
        return adapter.noPossibleWays;
    }

    const airplaneAdapter = {
        jolts: 0,
        noPossibleWays: null,
        usefulAdapters: adapters.filter(a => a.jolts <= 3)
    };

    return countSolution(airplaneAdapter);
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
const arr = input.split(/\n/).filter(line => line.length > 0).map(Number).sort((a, b) => a - b);
//console.log(arr);
console.log("PART 1:", getPart1(arr));
console.log("PART 2:", getPart2(arr));

