fs = require("fs");

function getPart1(input) {
    let currentMask;
    let mem = [];
    input.forEach((row) => {
        const split = row.split(" = ");
        if (split[0] === "mask") {
            currentMask = split[1];
            // console.log("new mask", currentMask);
        } else {
            const bitValue = parseInt(split[1])
                .toString(2)
                .padStart(36, '0');
            const memIndex = parseInt(/\d+/.exec(split[0])[0]);
            const newValue = bitValue.split('').map((bit, i) => {
                const bitMaskValue = currentMask.split('')[i];
                return bitMaskValue !== 'X' && bitMaskValue !== bit ? bitMaskValue : bit;
            }).join('');

            mem[memIndex] = parseInt(newValue, 2);
        }

    });
    return mem.reduce((acc, val) => (acc + val), 0);
}

function getPart2(input) {

    function copy(element) {
        return JSON.parse(JSON.stringify(element))
    }

    let mem = {};
    let mask;
    input.forEach((row) => {
        const [memOrMask, value] = row.split(" = ");
        if (memOrMask === "mask") {
            mask = value;
        } else {
            const result = parseInt(/\d+/.exec(memOrMask)[0])
                .toString(2)
                .padStart(36, '0')
                .split('')
                .map((bit, i) => (mask[i] === '1' || mask[i] === 'X' ? mask[i] : bit))
                .join('');

            let memAddresses = [copy(result.split(''))];
            let changed = 1;
            while (changed !== 0) {
                changed = 0;
                memAddresses.forEach((address, i) => {
                    let x = address.indexOf('X');
                    if (x !== -1) {
                        address[x] = '0';
                        memAddresses.push(copy(address));
                        address[x] = '1';
                        memAddresses.push(copy(address));
                        memAddresses.splice(i, '1');
                        changed++;
                    }
                })
            }

            memAddresses.forEach((binAddress) => {
                mem[parseInt(binAddress.join(''), 2)] = value;
            });
        }

    });
    return Object.values(mem).reduce((acc, val) => {
        return acc + parseInt(val)
    }, 0);
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
const arr = input.split(/\n/).filter(line => line.length > 0);
//console.log(arr);

console.log("PART 1 ", getPart1(arr));
console.log("PART 2 ", getPart2(arr));
