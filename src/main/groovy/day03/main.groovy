package day03

private static int countTrees(List<String> rows, int xStepLength, int yStepLength) {
    int rowLength = rows[0].length()

    rows.inject([trees: 0, x: 0, y: 0, currentY: 0]) { acc, row ->
        println("y: " + acc["y"] + " currentY: " + acc["currentY"])

        if (acc["currentY"] != acc["y"]) {
            //Should only drive past this location will only increase currentY
            acc.currentY = acc.currentY + 1
            return acc
        }
        //Stopping at this location and need to count tree
        return [trees   : acc["trees"] + ((row.charAt(acc["x"]) == ("#" as char)) ? 1 : 0),
                x       : (acc["x"] + xStepLength) % rowLength,
                y       : acc["y"] + yStepLength,
                currentY: acc["currentY"] + 1]
    }["trees"]
}

static int getPart1(List<String> rows) {
    return countTrees(rows, 3, 1)
}

static int getPart2(List<String> rows) {
    return countTrees(rows, 1, 1) *
            countTrees(rows, 3, 1) *
            countTrees(rows, 5, 1) *
            countTrees(rows, 7, 1) *
            countTrees(rows, 1, 2)
}


static void main(String[] args) {
    def rows = new File("input.txt").readLines()

    println getPart1(rows)
    println getPart2(rows)
}

