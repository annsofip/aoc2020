package day03

static int getPart1(List<String> rows) {
    return countTrees(rows, 3, 1)
}

private static int countTrees(List<String> rows, xStepLength, yStepLength) {
    int xPos = 0
    int yPos = 0
    int trees = 0
    while (yPos < rows.size()) {
        // println row
        // println("Pos = $xPos " + rows[yPos].charAt(xPos))
        if (rows[yPos].charAt(xPos).toString() == '#') {
            trees++
        }
        xPos = xPos + xStepLength < rows[yPos].length() ? xPos + xStepLength : xPos - rows[yPos].length() + xStepLength
        yPos = yPos + yStepLength

    }
    return trees
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

