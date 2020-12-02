fs = require("fs");


function getTwoNumbers(numbers) {
    return numbers.map(function (n) {
        const diff = 2020 - n;
        if (numbers.includes(diff)) {
            return n * diff;
        }
    }).find(function (element) {
        return element !== undefined;
    });
}

function getTwoNumbersWithReduce(numbers) {
    return numbers.reduce(function (acc, number) {
        const diff = 2020 - number;
        if (numbers.includes(diff)) {
            return number * diff;
        }
        return acc;
    }, 0);
}

function getThreeNumbers(numbers) {
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



const day1Input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = day1Input.split("\n").map(Number);
//console.log(arr);
console.log(getTwoNumbers(arr));
console.log(getTwoNumbersWithReduce(arr));
console.log(getThreeNumbers(arr));






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
