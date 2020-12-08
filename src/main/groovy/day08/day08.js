fs = require("fs");

function getPart1(input) {
    const instructions = getInstructions(input);
    let {acc} = runProgram(instructions, input);
    return acc;
}

function runProgram(instructions) {
    let visitedIndicies = [];
    let current = 0;
    let acc = 0;
    let success = false;
    while (current < instructions.length) {
        visitedIndicies.push(current);
        const instruction = instructions[current];
        if (instruction.action === "nop") {
            current++;
        } else if (instruction.action === "acc") {
            current++;
            acc += parseInt(instruction.count);
        } else if (instruction.action === "jmp") {
            let newIndex = current + parseInt(instruction.count);
            if (visitedIndicies.includes(newIndex)) {
                break;
            } else {
                current = newIndex;
            }
        } else {
            success = true;
            break;
        }
    }
    return {acc: acc, finished: success};
}

function getInstructions(input) {
    return input.map(function (line) {
        const splitLine = line.split(" ");
        return {
            action: splitLine[0],
            count: parseInt(splitLine[1])
        }
    });
}

function getPart2(input) {
    const instructions = getInstructions(input);

    let acc = 0;
    let changedInstruction = [];
    let finished = false;
    while (!finished) {
        let changed = false;
        let newInstruction = instructions.map(function (instruction, index) {
            if (!changed && instruction.action === "jmp" && !changedInstruction.includes(index)) {
                changedInstruction.push(index);
                changed = true;
                return {
                    action: "nop",
                    count: instruction.count
                }
            }
            return instruction;
        });
        ({acc, finished} = runProgram(newInstruction, input));
    }
    return acc
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
const arr = input.split(/\n/);
//console.log(arr);
console.log("PART 1:", getPart1(arr));
console.log("PART 2:", getPart2(arr));

