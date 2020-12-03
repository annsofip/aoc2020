fs = require("fs");

function countTrees(rows, move) {
    const width = rows[0].length;
    return rows.reduce(function (acc, current) {
        return {
            trees: acc.trees + (current.charAt(acc.x) === "#" ? 1 : 0),
            x: (acc.x + move.x) % width,
            y: acc.y + move.y
        };
    }, {
        trees: 0,
        x: 0,
        y: 0
    }).trees
}

function getPart1(rows) {
    return countTrees(rows, {x: 3, y: 1})
}

function getPart2(rows) {
    return countTrees(rows, {x: 3, y: 1}) *
        countTrees(rows, {x: 5, y: 1}) *
        countTrees(rows, {x: 7, y: 1}) *
        countTrees(rows, {x: 1, y: 2});
}

const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input.split("\n");
//console.log(arr);
console.log(getPart1(arr));
console.log(getPart2(arr));
