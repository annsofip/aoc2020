package day03

static int getPart1(List<String> rows) {
    return countTrees(rows, 3, 1)
}

private static int countTrees(List<String> rows, int xStepLength, int yStepLength) {
    int numberOfTrees = 0
    int rowLength = rows[0].length()
    int xPos = 0
    int yPos = 0
    while (yPos < rows.size()) {
        rows[yPos].charAt(xPos) == '#' as char ? ++numberOfTrees : null

        xPos = getNewXPos(xPos, xStepLength, rowLength)
        yPos = getNewYPos(yPos, yStepLength)

    }
    return numberOfTrees
}

private static int getNewYPos(int yPos, int yStepLength) {
    return yPos + yStepLength
}

private static int getNewXPos(int xPos, int xStepLength, int rowLength) {
    return xPos + xStepLength < rowLength ? xPos + xStepLength : xPos - rowLength + xStepLength
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

