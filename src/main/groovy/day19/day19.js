fs = require("fs");

const log = console.log;


function getPart1(input) {
    function getRule(value) {
        if (translatedRules.has(value)) {
            return translatedRules.get(value);
        }
        let result = '';
        if (/^".*"$/.test(value)) {
            result = value.replace(/"/g, '');
        } else if (/\|/.test(value)) {
            const [rs, ls] = value.split(' | ');
            result = `(${getRule(rs)}|${getRule(ls)})`;
        } else {
            result = value.split(' ').map(key => getRule(rules.get(key))).join('');
        }
        translatedRules.set(value, result);
        return result;
    }

    let rules = new Map();
    input[0].split(/\n/).forEach((rule) => {
        const [key, value] = rule.split(': ');
        rules.set(key, value)
    });

    let translatedRules = new Map();

    getRule(rules.get('0'));

    const ruleAtIndexZero = new RegExp('^' + getRule(rules.get('0')) + '$');
    return input[1].split('\n').reduce((acc, m) => {
        acc += (ruleAtIndexZero.test(m)) ? 1 : 0;
        return acc;
    }, 0);
}

function getPart2(input) {
    function getRule(value) {
        if (translatedRules.has(value)) {
            return translatedRules.get(value);
        }
        let result = '';
        if (/^".*"$/.test(value)) {
            result = value.replace(/"/g, '');
        } else if (/\|/.test(value)) {
            const [rs, ls] = value.split(' | ');
            result = `(${getRule(rs)}|${getRule(ls)})`;
        } else {
            result = value.split(' ').map(key => getRule(rules.get(key))).join('');
        }
        translatedRules.set(value, result);
        return result;
    }

    let rules = new Map();
    input[0].split(/\n/).forEach((rule) => {
        const [key, value] = rule.split(': ');
        rules.set(key, value)
    });

    let translatedRules = new Map();

    getRule(rules.get('0'));

 //  rules.set('0', '8 11'); // ( 42 | 42 8) | (42 31 | 42 11 31)
 //  rules.set('8', '42 | 42 8'); // 42 min once
 //  rules.set('11', '42 31 | 42 11 31'); // 42{n}31{n}


 //  getRule(rules.get('31'));
 //  getRule(rules.get('42'));

    const r31 = translatedRules.get(rules.get("31"));
    const r42 = translatedRules.get(rules.get("42"));
    const rule = new RegExp('^(?<g42>(' + r42 + ')+)(?<g31>(' + r31 + ')+)$');
    return input[1].split('\n').reduce((acc, m) => {

        const {groups} = rule.exec(m) || {};
        const m42 = groups && groups.g42.match(new RegExp(r42, 'g')).length;
        const m31 = groups && groups.g31.match(new RegExp(r31, 'g')).length;

        acc += m42 > m31 ? 1 : 0;
        return acc;
    }, 0);

}


const input = fs.readFileSync("./input.txt").toString('utf-8');
const arr = input.split(/\n\n/).filter(line => line);
console.log("PART 1 ", getPart1(arr));
console.log("PART 2 ", getPart2(arr));

//console.log("PART 1 ", getPart1(testData));
//console.log("PART 2 ", getPart2(["2 * 3 + (4 * 5)"]));
