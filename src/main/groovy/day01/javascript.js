fs = require("fs");


function getPart1(numbers) {
    return numbers.reduce(function (acc, number) {
        const diff = 2020 - number;
        if (numbers.includes(diff)) {
            return number * diff;
        }
        return acc;
    }, 0);
}

function getPart2(numbers) {
    return numbers.map(function (n) {
        return numbers.map(function (m) {
            const diff = 2020 - n - m;
            if (numbers.includes(diff)) {
                return m * n * diff;
            }
        }).find(function (element) {
            return element !== undefined;
        });
    }).find(function (element) {
        return element !== undefined;
    });
}



const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input.split("\n").map(Number);
//console.log(arr);
console.log(getPart1(arr));
console.log(getPart2(arr));






/*function getThreeNumbersWithReduce(numbers) {
    return numbers.reduce(function (acc, n) {
        return numbers.reduce(function (acc, m) {
            const diff = 2020 - n - m;
            if (numbers.includes(diff)) {
                console.log("I Am here")
                return n * m * diff;
            }
            return acc;
        }, 0);

    }, 0);
}
console.log(getThreeNumbersWithReduce(arr));*/
