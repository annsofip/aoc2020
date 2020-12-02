package day01

import spock.lang.*

import static day01.main.getPart1
import static day01.main.getPart2

class day01Test extends Specification {

    def "Should return correct amount for part 1"() {
        def numbers = [1721,
                       979,
                       366,
                       299,
                       675,
                       1456]

        expect:
        getPart1(numbers) == 514579
    }

    def "Should return correct amount for part 2"() {
        def numbers = [1721,
                       979,
                       366,
                       299,
                       675,
                       1456]

        expect:
        getPart2(numbers) == 241861950
    }

}
