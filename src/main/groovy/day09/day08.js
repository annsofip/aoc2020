fs = require("fs");

function findCorrupt(input, preambleLength) {
    for (var n = 0; n < input.length; n++) {
        const preamble = input.slice(n, n + preambleLength);
       // console.log("----------------------------------");
        // console.log(preamble);
        let sums = [];
        for (var i = 0; i < preamble.length; i++) {
            for (var j = i + 1; j < preamble.length; j++) {
                const sum = preamble[i] + preamble[j];
                //   console.log(":" + preamble[i] + " + " + preamble[j] + " = " + sum);
                sums.push(sum);
            }
        }


        //  console.log("Sums", sums);
        //  console.log("n: ", n)
        //  console.log("p: ", input[n+preambleLength]);
        if (!sums.includes(input[n + preambleLength])) {
            //   console.log("Failed on ", input[n+preambleLength]);
            return input[n + preambleLength];

        } else {
            //      console.log("Success on ", input[n+preambleLength]);
        }

    }
}

function getPart1(input) {
    return findCorrupt(input, 25);


}


function getPart2(input) {
    const preambleLength = 25;
    const number = findCorrupt(input, preambleLength);

    for (var n = 0; n < input.length; n++) {
        for (var i = 1; i < input.length; i++) {
            const range = input.slice(n, n + i);
          //  console.log("Range:", range);
            const sumOfINUmbers = range.reduce((acc, number) => acc + number, 0);
            if (sumOfINUmbers === number) {
                const sorted = range.sort();
             //   console.log(sorted)
             //   console.log(sorted[0] )
             //   console.log(sorted[0] )
                return sorted[0] + sorted[sorted.length-1];
            }

        }
    }


}


const input = fs.readFileSync("./input.txt").toString('utf-8');
const arr = input.split(/\n/).filter(line => line.length > 0).map(Number);
//console.log(arr);
console.log("PART 1:", getPart1(arr));
console.log("PART 2:", getPart2(arr));

