package day01

def numbers = new File("input.txt").readLines().collect({
    it.toInteger()
})

def answer = 0
numbers.each { n ->
    numbers.each { m ->
        if (n + m == 2020) {
            answer = n * m
        }
    }
}
println "Two numbrs: $answer"

numbers.each { n ->
    numbers.each { m ->
        numbers.each { l ->
            if (n + m + l == 2020) {
                answer = n * m * l
            }
        }
    }
}

println "Three numbrs: $answer"


