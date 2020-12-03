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

        xPos = (xPos + xStepLength) % rowLength
        yPos = yPos + yStepLength
    }
    return numberOfTrees
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

