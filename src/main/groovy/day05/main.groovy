package day05


static int getPart1(List<String> rows) {
    return scanBoardingPasses(rows).max()
}

private static List<Integer> scanBoardingPasses(List<String> rows) {
    return rows.collect({ boardingpass ->
        scanBoardingPass(boardingpass)
    })
}

private static int scanBoardingPass(String boardingpass) {
    def row = boardingpass.substring(0, 7).inject(0..127) { acc, letter ->
        int mid = (int) (acc.size() / 2)
        return letter == "F" ? acc[0..mid - 1] : acc[mid..acc.size() - 1]
    }[0]

    def column = boardingpass.substring(7, boardingpass.size()).inject(0..7) { acc, letter ->
        int mid = (int) (acc.size() / 2)
        return letter == "L" ? acc[0..mid - 1] : acc[mid..acc.size() - 1]
    }[0]

    return row * 8 + column
}

static int getPart2(List<String> rows) {
    List<String> ids = scanBoardingPasses(rows).sort()

    return ids.find({ int id ->
        !ids.contains(id + 1)
    })
}

static void main(String[] args) {
    def rows = new File("input.txt").readLines()
    //println(rows)
    println getPart1(rows)
    println getPart2(rows)
}
