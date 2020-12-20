fs = require("fs");

function getPart1(input) {
    const rules = input[0].split(/\n/).map((rule) => {
        const parsed = /[\w+]+: ([\d+]+)-([\d+]+)\sor\s([\d+]+)-([\d+]+)/g.exec(rule)
            .map(Number).slice(1);
        return parsed;
    });
    const nearbyTickets = input[2].split(/\n/)
        .filter((e) => (e !== 'nearby tickets:' && e !== ''));

    let ticketScanningErrorRate = 0;
    nearbyTickets.forEach((ticket) => {
        const parsedTicket = ticket
            .split(',')
            .map(Number);

        parsedTicket.forEach((value) => {
            let valid = Object.values(rules).reduce(function (acc, rule) {
                return (rule[0] <= value && value <= rule[1] ||
                    rule[2] <= value && value <= rule[3]) ? true : acc;
            }, false);
            !valid && (ticketScanningErrorRate += value);
        })
    });
    return ticketScanningErrorRate;
}

function getPart2(input) {
    const rules = input[0].split(/\n/).map((rule) => {
        const parsed = /[\w+]+: ([\d+]+)-([\d+]+)\sor\s([\d+]+)-([\d+]+)/g.exec(rule)
            .map(Number).slice(1);
        return { rule: parsed};
    });
    const myTicket = input[1].split(/\n/)[1];
    let invalidTickets = [];
    const nearbyTickets = input[2].split(/\n/)
        .filter((e) => (e !== 'nearby tickets:' && e !== ''));

    let ticketScanningErrorRate = 0;
    nearbyTickets.forEach((ticket) => {
        const parsedTicket = ticket
            .split(',')
            .map(Number);

        parsedTicket.forEach((value) => {
            let valid = Object.values(rules).reduce(function (acc, rule) {
                return (rule[0] <= value && value <= rule[1] ||
                    rule[2] <= value && value <= rule[3]) ? true : acc;
            }, false);
            !valid && (ticketScanningErrorRate += value);
        })
    });
    return ticketScanningErrorRate;

}


const input = fs.readFileSync("./input.txt").toString('utf-8');
const arr = input.split(/\n\n/).filter(line => line.length > 0);
console.log("PART 1 ", getPart1(arr));
//console.log("PART 2 ", getPart2(arr));

let testData = ["class: 1-3 or 5-7",
    "row: 6-11 or 33-44",
    "seat: 13-40 or 45-50",
    "",
    "your ticket:",
    "7,1,14",
    "",
    "nearby tickets:",
    "7,3,47",
    "40,4,50",
    "55,2,20",
    "38,6,12"];
//console.log("PART 2 ", getPart1(testData));
