const wordFrom = require('../index.js');

test("Non-numeric values", () => {
  ["f", "", [], {}, null, NaN, undefined]
    .forEach(arg => expect(wordFrom(arg)).toBeUndefined())
})

test("Unsafe numbers", () => {
  [1.2,, 0.21421, 12412.2, 192530257132532235671230, 2197501242652579812918, 131515215215138398384438, 3168587878578921357231123, 215363246734587734623, 4326324634234234643263, 125784215140320521251, 215215220547513531515, 1e23]
    .forEach(arg => expect(wordFrom(arg)).toBe(`Passed number is not safe. \nAvailable numbers are digit numbers in range [${Number.MIN_SAFE_INTEGER}; ${Number.MAX_SAFE_INTEGER}] \n...or pass the number wrapped in quotes.`))
})