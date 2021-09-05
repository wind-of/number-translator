const { expectToBe } = require("./utils");
const { NOT_A_NUMBER, NOT_SAFE_NUMBER, NON_NUMERIC_SYMBOLS, EXTRA_SYMBOLS, TOO_BIG_NUMBER } = require("../validation/errors");

test("Non-numeric values", () => {
  ["f", "", [], {}, null, NaN, undefined]
    .forEach(arg => expectToBe(arg, NOT_A_NUMBER))
})

test("Unsafe numbers", () => {
  expectToBe(192530257132532235671230, NOT_SAFE_NUMBER)
  expectToBe(219750124265257981291812412, NOT_SAFE_NUMBER)
})

test("Non-numeric symbols", () => {
  expectToBe("21412f212412412", NON_NUMERIC_SYMBOLS)
  expectToBe("078*\/'].[],]]-+", NON_NUMERIC_SYMBOLS)
})

test("Extra symbols", () => {
  expectToBe("22-22", EXTRA_SYMBOLS)
  expectToBe("22.2.212312321321", EXTRA_SYMBOLS)
  expectToBe("-2222222-222222", EXTRA_SYMBOLS)
})

test("Too big number", () => {
  expectToBe("1".repeat(307), TOO_BIG_NUMBER)
  expectToBe("-" + "1".repeat(307), TOO_BIG_NUMBER)
  expectToBe("1." + "2".repeat(306), TOO_BIG_NUMBER)
  expectToBe("-1." + "2".repeat(306), TOO_BIG_NUMBER)
})