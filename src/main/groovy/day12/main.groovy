package day12


static def getPart1(List<String> input) {


    return 10000
}


static int getPart2(List<String> input) {
    return 2000
}


static void main(String[] args) {
    List<String> rows = new File("input.txt")
            .getText()
            .split(/\n/)

    // println(rows)
    println getPart1(rows)
    println getPart2(rows)
}

