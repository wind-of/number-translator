const { translateNumber } = require("../index");
const { errors } = require("../errors");
test("Non-numeric values", () => {
  ["f", "", [], {}, null, NaN, undefined]
    .forEach(arg => expect(translateNumber(arg)).toBe(errors.NotANumber))
})

test("Unsafe numbers", () => {
  [192530257132532235671230, 2197501242652579812918, 131515215215138398384438, 3168587878578921357231123, 215363246734587734623, 4326324634234234643263, 125784215140320521251, 215215220547513531515, 1e23]
    .forEach(arg => expect(translateNumber(arg)).toBe(errors.NotSafeNumber))
})