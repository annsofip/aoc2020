package day01


static int getPart1(List<Integer> numbers) {

    return numbers.inject(0) { result, number ->
        def diff = 2020 - number
        if (numbers.contains(diff)) {
            return number * diff
        }
        return result
    }
}

static int getPart2(List<Integer> numbers) {
    def answer
    numbers.each { n ->
        numbers.each { m ->
            def l = 2020 - m - n
            if (numbers.contains(l)) {
                answer = n * m * l
            }
        }
    }
    return answer
}


static void main(String[] args) {
    def numbers = new File("input.txt").readLines().collect({
        it.toInteger()
    })

    println getPart1(numbers)
    println getPart2(numbers)
}
