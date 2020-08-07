const { translateNumber } = require("../index");
const { errors } = require("../validation/errors");
const { NotANumber, NotSafeNumber, nonNumericSymbols } = errors;

test("Non-numeric values", () => {
  ["f", "", [], {}, null, NaN, undefined]
    .forEach(arg => expect(translateNumber(arg)).toBe(NotANumber))
})

test("Unsafe numbers", () => {
  expect(translateNumber(192530257132532235671230)).toBe(NotSafeNumber);
  expect(translateNumber(219750124265257981291812412)).toBe(NotSafeNumber);
  expect(translateNumber(13151521521513839838443821214)).toBe(NotSafeNumber);
  expect(translateNumber(3168587878578921357231121242143)).toBe(NotSafeNumber);
  expect(translateNumber(21536324673458773462214124214123)).toBe(NotSafeNumber);
})

test("Non-numeric symbols", () => {
  expect(translateNumber("2141221fa2412412")).toBe(nonNumericSymbols);
  expect(translateNumber("21421 fafa fa1412")).toBe(nonNumericSymbols);
  expect(translateNumber("078*\/'].[],]]-+")).toBe(nonNumericSymbols);
  expect(translateNumber("1f")).toBe(nonNumericSymbols);
})