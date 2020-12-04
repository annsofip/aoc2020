package day04

import spock.lang.Specification

import static day04.main.*

class day04Test extends Specification {


    def "byr 2002 is valid"() {
        expect:
        inRange(2002, 2002, 2002) == true
    }
    def "byr 2003 is invalid"() {
        expect:
        inRange(2003, 2002, 2002) == false
    }
    def "hgt 60in is valid"() {
        expect:
        isValidHgt("60in") == true
    }
    def "hgt 190cm is valid"() {
        expect:
        isValidHgt("190cm") == true
    }

    def "hgt 190in is invalid"() {
        expect:
        isValidHgt("190in") == false
    }

    def "hgt 190 is invalid"() {
        expect:
        isValidHgt("190") == false
    }

    def "hcl #123abc is valid"() {
        expect:
        isValidHcl("#123abc")
    }

    def "hcl #123abz is invalid"() {
        expect:
        !isValidHcl("#123abz")
    }

    def "hcl 123abc is invalid"() {
        expect:
        !isValidHcl("123abc")
    }

    def "ecl brn is valid"() {
        expect:
        isValidEcl("brn")
    }

    def "ecl wat is valid"() {
        expect:
        !isValidEcl("wat")
    }

    def "pid 000000001 is valid"() {
        expect:
        isValidPid("000000001")
    }

    def "pid 0123456789 is invalid"() {
        expect:
        !isValidPid("0123456789")
    }


}
