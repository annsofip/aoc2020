fs = require("fs");


String.prototype.count = function (s1) {
    return (this.length - this.replace(new RegExp(s1, "g"), '').length) / s1.length;
};

function getPart1(groups) {
    return groups.map(function (group) {
        return new Set(group.replace(/\n/g, "").split('')).size
    }).reduce(function (acc, el) {
        return acc + el;
    })
}

function getPart2(groups) {
    return groups.map(function (group) {
        const person = group.split(/\n/g);
        return new Set(person.map(function (answers) {
            return answers.split("").filter(function (answer) {
                return group.count(answer) === person.length;
            });
        }).flat()).size;
    }).reduce((a, b) => a + b)
}

const input = fs.readFileSync("./input.txt").toString('utf-8');
const arr = input.split(/\n\n/);
//console.log(arr);
console.log(getPart1(arr));
console.log(getPart2(arr));

