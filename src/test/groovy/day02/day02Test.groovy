package day02


import spock.lang.Specification

import static day02.main.getPart1
import static day02.main.getPart2

class day02Test extends Specification {

    def "Should return correct amount for part 1"() {
        List<String> rows = ["1-3 a: abcde",
                    "1-3 b: cdefg",
                    "2-9 c: ccccccccc"]

        expect:
        getPart1(rows) == 2
    }

    def "Should return correct amount for part 2"() {
        List<String> rows = ["1-3 a: abcde",
                    "1-3 b: cdefg",
                    "2-9 c: ccccccccc"]

        expect:
        getPart2(rows) == 1
    }

}
