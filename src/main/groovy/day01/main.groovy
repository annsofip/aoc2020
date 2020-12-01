package day01

def numbers = new File("input.txt").readLines().collect({
    it.toInteger()
})

//Part one
def val1 = numbers.inject(0) { result, number ->
    def diff = 2020 - number
    if (numbers.contains(diff)) {
        return number * diff
    }
    return result
}
println "Two numbers: $val1"


def answer = 0
numbers.each { n ->
    numbers.each { m ->
        def l = 2020 - m - n
        if (numbers.contains(l)) {
            answer = n * m * l
        }
    }
}
println "Three numbers: $answer"
