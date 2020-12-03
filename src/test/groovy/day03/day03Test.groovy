package day03


import spock.lang.Specification

import static day03.main.getPart1
import static day03.main.getPart2

class day03Test extends Specification {

    def "Should count trees correctly in part 1"() {
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
        getPart1(rows) == 7
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
        getPart2(rows) == 336
    }

}
