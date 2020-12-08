fs = require("fs");

function getPart1(input) {
    let visitedIndicies = [];
    let current = 0;
    let acc = 0;
    while (current < input.length) {
        visitedIndicies.push(current);

        //  console.log(input[current]);
        const splitLine = input[current].split(" ");
        //  console.log(splitLine);

        if (splitLine[0] === "nop") {
            current++;
            //   console.log("Nop:", acc);
        } else if (splitLine[0] === "acc") {
            current++;
            acc += parseInt(+splitLine[1]);
            //    console.log("Acc:", acc);
        } else if (splitLine[0] === "jmp") {
            //   console.log("jmp:", +splitLine[1]);
            let newIndex = current + parseInt(splitLine[1]);
            //  console.log("newIndex:", newIndex);

            if (visitedIndicies.includes(newIndex)) {
                break;
            } else {
                current = newIndex;
            }

        }
        //   console.log("--------------------------------")

    }

    //  console.log("Visited:", visitedIndicies);
    return acc
}

function runProgram(instructions) {
    let visitedIndicies = [];
    let current = 0;
    let acc = 0;
    let success = false;
    while (current < instructions.length) {
        visitedIndicies.push(current);
        const instruction = instructions[current];
        console.log(instruction);
        if (instruction.action === "nop") {
            current++;
            //   console.log("Nop:", acc);
        } else if (instruction.action === "acc") {
            current++;
            acc += parseInt(instruction.count);
            //    console.log("Acc:", acc);
        } else if (instruction.action === "jmp") {
            //   console.log("jmp:", +splitLine[1]);
            let newIndex = current + parseInt(instruction.count);
            //  console.log("newIndex:", newIndex);

            if (visitedIndicies.includes(newIndex)) {
                break;
            } else {
                current = newIndex;
            }

        } else {
            console.log("SUCCESS!!");
            success = true;
            break;
        }
        console.log("--------------------------------")

    }
    return {acc: acc, finished: success};
}

function getPart2(input) {

    const instructions = input.map(function (line) {
        const splitLine = line.split(" ");
        return {
            action: splitLine[0],
            count: parseInt(splitLine[1])
        }
    });


    let changedInstruction = [];
    let acc = 0;
    let finished = false;
    while (!finished) {
        let changed = false;
        let newInstruction = instructions.map(function (instruction, index) {
            if (!changed && instruction.action === "jmp" && !changedInstruction.includes(index)) {
                changedInstruction.push(index);
                changed = true;
                console.log("Changing", index);
                return {
                    action: "nop",
                    count: instruction.count
                }
            }
            return instruction;
        });
        console.log(newInstruction);
        let result = runProgram(newInstruction, input);
        finished = result.finished;
        acc = result.acc;
        console.log("--------------------------------")
    }


    //   console.log("Visited:", visitedIndicies);
    return acc
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
const arr = input.split(/\n/);
//console.log(arr);
//console.log("PART 1:", getPart1(arr));
console.log("PART 2:", getPart2(arr));

