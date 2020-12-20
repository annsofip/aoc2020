fs = require("fs");

const log = console.log;



function evaluateExpressions(str, evaluateFn) {
    while (true) {
        const expr = getExpression(str);
        if (!expr) break;
        const {expression, from, to} = expr;
        str = str.substring(0, from - 1) + evaluateFn(expression) + str.substring(to + 1);
    }
    return str;
}

function getExpression(str) {
    let parens = 0, from = -1;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(') {
            if (parens === 0)
                from = i;
            parens++;
        } else if (str[i] === ')') {
            parens--;
            if (parens === 0)
                return {expression: str.substring(from + 1, i), from: from + 1, to: i};
        }
    }
}

function getPart1(input) {

    function evaluate(str) {
        let parsed = str.split('').filter(c => c.trim()).join('');
        parsed = evaluateExpressions(parsed, evaluate);
        const first = parseInt(parsed.match(/^\d+/)[0]);
        return parsed.match(/([\+\*])\d+/g).reduce((a, c) => eval(a + c), first);

    }

    return input.map((row) => {
        return evaluate(row.split('').filter(c => c.trim()).join(''));
    }).reduce((a, b) => (a + b), 0);


}

function getPart2(input) {

    function evaluate(str) {
        let parsed = str.split('').filter(c => c.trim()).join('');
        parsed = evaluateExpressions(parsed, evaluate);
        return parsed.split('*').reduce((a, c) => a * eval(c), 1)

    }

    return input.map((row) => {
        return evaluate(row.split('').filter(c => c.trim()).join(''));
    }).reduce((a, b) => (a + b), 0);

}


const input = fs.readFileSync("./input.txt").toString('utf-8');
const arr = input.split(/\n/).filter(line => line.length > 0);
console.log("PART 1 ", getPart1(arr));
console.log("PART 2 ", getPart2(arr));

let testData = [];
//console.log("PART 1 ", getPart1(["2 * 3 + (4 * 5)", "((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2"]));
//console.log("PART 1 ", getPart1(arr));
//console.log("PART 2 ", getPart2(["2 * 3 + (4 * 5)"]));
