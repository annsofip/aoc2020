fs = require("fs");


function getPart1(rows) {
    return rows.filter(row =>
        row.includes("byr") &&
        row.includes("iyr") &&
        row.includes("eyr") &&
        row.includes("hgt") &&
        row.includes("hcl") &&
        row.includes("ecl") &&
        row.includes("pid")
    ).length;
}


function getPart2(rows) {
    return rows.filter(row =>
        row.split(" ").reduce(function (map, keyValueString) {
            map[keyValueString.split(":")[0]] = keyValueString.split(":")[0];
            return map;
        }, {})
    ).filter(function (passport) {
       // console.log(isValidPassport(passport));
        return isValidPassport(passport);
    }).length;
}

function isValidPassport(passport) {
    console.log(passport)
    return isValidByr(passport["byr"]) &&
        isValidIyr(passport["iyr"]) &&
        isValidEyr(passport["eyr"]) &&
        isValidHgt(passport["hgt"]) &&
        isValidHcl(passport["hcl"]) &&
        isValidEcl(passport["ecl"]) &&
        isValidPid(passport["pid"])
}

function isValidPid(value) {
    console.log( value && value === ~/[0-9]{9}/);
    return value && value === ~/[0-9]{9}/;
}


function isValidHcl(value) {
    return value && value === ~/#[0-9a-f]{6}/;
}

function isValidByr(value) {
    console.log(value)
   // console.log(value && inRange(value, 1920, 2002));
    return value && inRange(value, 1920, 2002);
}

function isValidIyr(value) {
    return value && inRange(value, 2010, 2020);
}

function isValidEyr(value) {
    return value && inRange(value, 2020, 2030);
}

function inRange(value, min, max) {
    return value && value >= min && value <= max;
}

function isValidHgt(value) {
    return value &&
        ((value.contains("cm") && inRange(value.split("cm")[0], 150, 193))
            || (value.contains("in") && inRange(value.split("in")[0], 59, 76)))
}

function isValidEcl(value) {
    const validEyeColors = ["amb",
        "blu",
        "brn",
        "gry",
        "grn",
        "hzl",
        "oth"];
    return validEyeColors.includes(value)
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
let arr = input.split("\n\n").map(value => value.replace(/\n/g, " "));
//console.log(arr);
console.log(getPart1(arr));
console.log(getPart2(arr));
//
