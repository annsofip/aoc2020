package day05


static int getPart1(List<String> rows) {

    List<Object> ids = scanBoardingPasses(rows)
    return ids.max()
}

private static List<Integer> scanBoardingPasses(List<String> rows) {
    return rows.collect({ boardingpass ->
        scanBoardingPass(boardingpass)
    })
}

private static Integer scanBoardingPass(String boardingpass) {

    def row = boardingpass.substring(0, 7).inject(0..127) { acc, letter ->
        int mid = (int) (acc.size() / 2)
        def left = acc[0..mid - 1]
        def right = acc[mid..acc.size() - 1]
        return letter == "F" ? left : right
    }

    def column = boardingpass.substring(7, boardingpass.size()).inject(0..7) { acc, letter ->
        int mid = (int) (acc.size() / 2)
        def left = acc[0..mid - 1]
        def right = acc[mid..acc.size() - 1]
        return letter == "L" ? left : right
    }

    return row[0] * 8 + column[0]

}

static int getPart2(List<String> rows) {
    List<String> ids = scanBoardingPasses(rows).sort()
    def index = 1
    def seat = 0
    while (ids.size() - 1 > index) {
        int seatBefore = Integer.valueOf((String) ids[index])
        int nextSeat = Integer.valueOf((String) ids[index+1])


        if (nextSeat - seatBefore == 1) {
            //  println("alls good")
        } else {
            seat = seatBefore + 1
        }

        index++
    }
    return seat
}

static void main(String[] args) {
    def rows = new File("input.txt").readLines()
    //println(rows)
    println getPart1(rows)
    println getPart2(rows)
}

