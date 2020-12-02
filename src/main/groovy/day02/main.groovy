package day02

def part1 = new File("input.txt").readLines().inject(0) { result, input ->
    def row = input.split(" ")
    def range = row[0].split("-")
    def max = range[1].toInteger()
    def min = range[0].toInteger()
    def letter = row[1].split(":").first()
    def password = row[2]
    println "$letter must occur min $min times and max $max times in $password"
    // println(min <= password.count(letter) && password.count(letter) <= max)
    return (min <= password.count(letter) && password.count(letter) <= max) ? ++result : result
}

println(part1)


def part2 = new File("input.txt").readLines().inject(0) { result, input ->
    def row = input.split(" ")
    def range = row[0].split("-")
    def maxIndex = range[1].toInteger() - 1
    def minIndex = range[0].toInteger() - 1
    def letter = row[1].split(":").first()
    def password = row[2]
    println "$letter must be in index $minIndex OR in index $maxIndex in $password"
    def minTrue = password.charAt(minIndex) == letter.charAt(0) ? 1 : 0
    println(minTrue + " " + password.charAt(minIndex) + " " + letter.charAt(0))
    def maxTrue = password.charAt(maxIndex) == letter.charAt(0) ? 1 : 0
    println(maxTrue + " " + password.charAt(minIndex) + " " + letter.charAt(0))
    return (minTrue + maxTrue == 1) ? ++result : result
}

println(part2)



