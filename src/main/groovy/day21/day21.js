fs = require("fs");

const log = console.log;

function getIngredientsWithAllergen(input) {
    const allergens2Ingredients = {};
    input.forEach((row) => {
        const [ingredients, allergens] = row.replace(/\)/, '')
            .split(' (contains ')
            .map(x => x.split(/[ ,]+/g));

        allergens.forEach(a => {
            if (a in allergens2Ingredients) {
                const newIngredients = ingredients.filter(x => allergens2Ingredients[a].has(x));
                allergens2Ingredients[a] = new Set(newIngredients);
            } else {
                allergens2Ingredients[a] = new Set(ingredients);
            }
        });
    });

    const foundIngredientsWithAllergen = {};
    let keys = Object.keys(allergens2Ingredients);
    while (keys.length) {
        const foundAllergen = keys.find(key => (allergens2Ingredients[key].size === 1))
        const ingredient = [...allergens2Ingredients[foundAllergen]][0];
        foundIngredientsWithAllergen[ingredient] = foundAllergen;
        for (const allergen in allergens2Ingredients) {
            allergens2Ingredients[allergen].delete(ingredient);
        }
        delete allergens2Ingredients[foundAllergen];
        keys = Object.keys(allergens2Ingredients);
    }
    return foundIngredientsWithAllergen;
}

function getPart1(input) {

    const foundIngredientsWithAllergen = getIngredientsWithAllergen(input);

    let sum = 0;
    input.forEach((row) => {
        const [ingredients, allergens] = row.replace(/\)/, '')
            .split(' (contains ')
            .map(x => x.split(/[ ,]+/g));
        for (const ingredient of ingredients) {
            if (!(ingredient in foundIngredientsWithAllergen)) {
                sum++;
            }
        }
    });
    return sum;

}

function getPart2(input) {
    const foundIngredientsWithAllergen = getIngredientsWithAllergen(input);

    const canonicalDangerousIngredientList = Object.entries(foundIngredientsWithAllergen)
        .sort((a, b) => {
            if (a[1] < b[1]) return -1;
            if (a[1] > b[1]) return 1;
            return 0;
        }).map(x => x[0]).join(',');
    return canonicalDangerousIngredientList;
}


const input = fs.readFileSync("./input.txt").toString('utf-8');
const arr = input.split(/\n/).filter(line => line);
console.log("PART 1 ", getPart1(arr));
console.log("PART 2 ", getPart2(arr));

//console.log("PART 1 ", getPart1(testData));
//console.log("PART 2 ", getPart2(["2 * 3 + (4 * 5)"]));
