package day07


static def getPart1(List<String> input) {
    def rules = input.inject([:]) { acc, line ->
        def split = line.split(" contain ")
        def result = (split[1] =~ /(\d) (\w+ \w+)/).findAll()
        acc[split[0]] = result
        return acc
    }

    return 10000
}


static int getPart2(List<String> input) {
    def rules = input.inject([:]) { acc, line ->
        def split = line.split(" bags contain ")
        acc[split[0]] = split[1].split(",").collect({ s ->
            def matcher = (s =~ / ?(\d) (\w+ \w+) bags?.?,? ?/)
            if (matcher.matches()) {
                return [type: matcher[0][2], number: Integer.parseInt(matcher[0][1])]
            }

        }).findAll({ it })
        return acc
    }
    return getCountFor(rules, "shiny gold")
}

def static getCountFor(LinkedHashMap rules, String bag) {
    def count = 0
    if (rules.containsKey(bag)) {
        rules.get(bag).each { b ->
            count += b.number + getCountFor(rules, b.type) * b.number
        }
    }
    return count
}


static void main(String[] args) {
    List<String> rows = new File("input.txt")
            .getText()
            .split(/\n/)

    // println(rows)
    // println getPart1(rows)
    println getPart2(rows)
}

