fs = require("fs");

function getPart1(input) {
    const time = input[0];
    const earliestBus = input[1].split(',')
        .filter((line) => (
            line !== 'x'
        )).map(Number).map((line) => {
            return {line: line, waitingTime: ((line * Math.floor(time / line) + line) - time)};
        }).sort((a, b) => (a.waitingTime - b.waitingTime))[0];
    return earliestBus.waitingTime * earliestBus.line;
}

function getPart2(input) {
    const buses = input[1].split(',')
        .map((id, index) => {
            return {
                id: id === 'x' ? id : parseInt(id),
                index
            };
        })
        .filter((bus) => (bus.id !== 'x'));

    let t = 0;
    // Set multiplier to first bus, making the criteria for the first bus
    // satisfied before we start looping
    let busIndex = 0;
    let multiplier = buses[busIndex].id;
    let next = buses[++busIndex];

    // Add counter to count number of
    let iterations = 0;
    while (busIndex < buses.length) {
        iterations++;
        // increase t with multiplier
        t += multiplier;
        // Check if t satisfy first busIndex buses in buses
        if ((t + next.index) % next.id === 0) {
            // will make product new multiplier
            multiplier *= next.id;
            // increase busIndex because this one is satisfied
            next = buses[++busIndex];
        }
    }
    console.log(`Made ${iterations} iterations when trying to find the solution`)
    return t;

}

const input = fs.readFileSync("./input.txt").toString('utf-8');
const arr = input.split(/\n/).filter(line => line.length > 0);
//console.log(arr);
//getPart1(arr)
//console.log(getPart1(arr) === 590 ? "Part1 is correct for input" : `expected 590 but was ${getPart1(arr)}`);
//console.log(getPart2(arr) === 42013 ? "Part2 is correct for input" : `expected 42013 but was ${getPart2(arr)}`);
console.log("PART 2 ", getPart2(arr));

//let testData = ["939",
//    "17,x,13,19"];
//console.log("PART 2 ", getPart2(testData));
