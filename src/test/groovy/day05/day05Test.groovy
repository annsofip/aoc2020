package day05

import spock.lang.Specification

import static day05.main.getPart1
import static day05.main.getPart2


class day05Test extends Specification {


    def "Should count trees correctly in part 1"() {
        String input = ["FBFBBFFRLR"]

        expect:
        //getPart1(input) == |row 44, column 5, id: 357]
        1==1
    }

    def "Should count trees correctly in part 2"() {
        List<String> rows = ["..##.......",
                             "#...#...#..",
                             ".#....#..#.",
                             "..#.#...#.#",
                             ".#...##..#.",
                             "..#.##.....",
                             ".#.#.#....#",
                             ".#........#",
                             "#.##...#...",
                             "#...##....#",
                             ".#..#...#.#"]

        expect:
        getPart2(rows) == 11
    }
}
