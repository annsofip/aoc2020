package day06


static int getPart1(List<String> rows) {
    return (Integer) rows.collect({
        it.replace("\n", "")
    }).collect({ String row -> row.toSet().sort().join().length() }).sum()
}

static int getPart2(List<String> input) {
    return (Integer) input.collect({ group ->
        def person = group.split("\n")
        person.collect({ answers ->
            answers.findAll({ answer ->
                group.count(answer) == person.size()
            })
        }).flatten().unique().size()
    }).sum()
}

static void main(String[] args) {
    List<String> rows = new File("input.txt").getText().split("\\n\\n")

    //println(rows)
    println getPart1(rows)
    println getPart2(rows)
}

