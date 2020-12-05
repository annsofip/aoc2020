package day04

/*

byr (Birth Year)
iyr (Issue Year)
eyr (Expiration Year)
hgt (Height)
hcl (Hair Color)
ecl (Eye Color)
pid (Passport ID)
cid (Country ID)

*/

static int getPart1(List<String> rows) {
    return rows.findAll({ row ->
        return row.contains("byr") &&
                row.contains("iyr") &&
                row.contains("eyr") &&
                row.contains("hgt") &&
                row.contains("hcl") &&
                row.contains("ecl") &&
                row.contains("pid")
    }).size()
}

static int getPart2(List<String> passports) {
    return passports.collect({ row ->
        return row.split(" ").inject([:]) { acc, tuple ->
            def keyValue = tuple.split(":")
            acc[(keyValue[0])] = keyValue[1]
            return acc

        }
    }).findAll({ isValidPassport(it) }).size()
}

private static boolean isValidPassport(LinkedHashMap<String, String> passport) {
    isValidByr(passport.byr) &&
            isValidIyr(passport.iyr) &&
            isValidEyr(passport.eyr) &&
            isValidHgt(passport.hgt) &&
            isValidHcl(passport.hcl) &&
            isValidEcl(passport.ecl) &&
            isValidPid(passport.pid)
}

private static boolean isValidPid(String value) {
    value && value ==~ /[0-9]{9}/
}


private static boolean isValidHcl(String value) {
    value && value ==~ /#[0-9a-f]{6}/
}

private static boolean isValidByr(String value) {
    value && inRange(value.toInteger(), 1920, 2002)
}

private static boolean isValidIyr(String value) {
    value && inRange(value.toInteger(), 2010, 2020)
}

private static boolean isValidEyr(String value) {
    value && inRange(value.toInteger(), 2020, 2030)
}

static boolean inRange(int value, int min, int max) {
    value && value >= min && value <= max
}

static boolean isValidHgt(String value) {
    return value &&
            ((value.contains("cm") && inRange(value.split("cm")[0].toInteger(), 150, 193))
                    || (value.contains("in") && inRange(value.split("in")[0].toInteger(), 59, 76)))
}

static boolean isValidEcl(String value) {
    def validEyeColors = ["amb",
                          "blu",
                          "brn",
                          "gry",
                          "grn",
                          "hzl",
                          "oth"]
    return validEyeColors.contains(value)
}


static void main(String[] args) {
    def rows = new File("input.txt").getText().split("\\n\\n")
            .collect({ it.replace("\n", " ") })
    //println(rows)
    println getPart1(rows)
    println getPart2(rows)
}

