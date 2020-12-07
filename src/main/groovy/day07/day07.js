fs = require("fs");

function getPart1(input) {
    const rules = input.reduce(function (acc, line) {
        const split = line.split(" bags contain ");
        acc[split[0]] = split[1].split(",").map(function (child) {
            const bag = (/\d+ (\w+ \w+) bags?/g).exec(child);
            return bag ? bag[1] : undefined;
        }).filter(bag => bag);

        return acc;
    }, {});


    let lokingFor = ["shiny gold"];
    let result = [];
    let searchQue = [];
    do {
        searchQue = [];
        for (const i of lokingFor) {
            //console.log("Looking for: ", i);
            for (const j of Object.keys(rules)) {
                //console.log("Going through: ", j);
                if (rules[j].includes(i)) {
                    //console.log(rules[j], i);
                    searchQue.push(j);
                    result.push(j);
                }
            }
        }
        lokingFor = searchQue;
    } while (searchQue.length > 0);

    return new Set(result).size;
}

function getPart2(input) {
    const rules = input.reduce(function (acc, line) {
        const split = line.split(" bags contain ");
        acc[split[0]] = split[1].split(",").map(function (child) {
            const bag = (/(\d+) (\w+ \w+) bags?/g).exec(child);
            //bag ? console.log(bag) : undefined;
            return bag ? {type: bag[2], count: +bag[1]} : undefined;
        }).filter(bag => bag);
        return acc;
    }, {});

    //console.log("Rules", rules);

    function getCountFor(bag) {
        let totalCount = 0;
        //console.log("Bag:", bag);
        if (rules[bag]) {
            //console.log("rules[bag]:", rules[bag]);
            rules[bag].forEach(({type, count}) => {
                totalCount += count + getCountFor(type) * count;
            });
        }
        return totalCount;
    }
    return getCountFor("shiny gold");
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
const arr = input.split(/\n/);
//console.log(arr);
console.log("PART 1:", getPart1(arr));
console.log("PART 2:",getPart2(arr));

