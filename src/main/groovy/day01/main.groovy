package day01


static int getTwoNumbers(List<Integer> numbers) {

    return numbers.inject(0) { result, number ->
        def diff = 2020 - number
        if (numbers.contains(diff)) {
            return number * diff
        }
        return result
    }
}

static int getThreeNumbers(List<Integer> numbers) {
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

    println getTwoNumbers(numbers)
    println getThreeNumbers(numbers)
}
