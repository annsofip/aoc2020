package day01

def floor = new File("input.txt")
        .eachLine {
            it.split("")
                    .collect {
                        if (it == "(")
                            1
                        else if (it == ")")
                            -1
                        else
                            0
                    }.inject { v1, v2 -> v1 + v2 }
        }.inject { v1, v2 -> v1 + v2 }

println floor

def sum = 0
def pos = 0
new File("input.txt")
        .text
        .split("")
        .eachWithIndex { String entry, int i ->
            if (sum == -1 && pos == 0) {
                pos = i
                return
            }
            if (entry == "(")
                sum++
            else if (entry == ")")
                sum--
        }
println pos

