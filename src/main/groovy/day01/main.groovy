package day01

def numbers = new File("input.txt").readLines().collect({
    it.toInteger()
})

def answer = 0

//Part one
numbers.each { n ->
    def m = 2020 - n
    if (numbers.contains(m)) {
        answer = n * m
    }
}
println "Two numbers: $answer"

//Part two
numbers.each { n ->
    numbers.each { m ->
        def l = 2020 - m - n
        if (numbers.contains(l)) {
            answer = n * m * l
        }
    }
}
println "Three numbers: $answer"
