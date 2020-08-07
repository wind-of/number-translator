const { translateNumber } = require("../index");
const { NOT_A_NUMBER, NOT_SAFE_NUMBER, NON_NUMERIC_SYMBOLS, EXTRA_SYMBOLS } = require("../validation/errors");

test("Non-numeric values", () => {
  ["f", "", [], {}, null, NaN, undefined]
    .forEach(arg => expect(translateNumber(arg)).toBe(NOT_A_NUMBER))
})

test("Unsafe numbers", () => {
  expect(translateNumber(192530257132532235671230)).toBe(NOT_SAFE_NUMBER);
  expect(translateNumber(219750124265257981291812412)).toBe(NOT_SAFE_NUMBER);
  expect(translateNumber(13151521521513839838443821214)).toBe(NOT_SAFE_NUMBER);
  expect(translateNumber(3168587878578921357231121242143)).toBe(NOT_SAFE_NUMBER);
  expect(translateNumber(21536324673458773462214124214123)).toBe(NOT_SAFE_NUMBER);
})

test("Non-numeric symbols", () => {
  expect(translateNumber("2141221fa2412412")).toBe(NON_NUMERIC_SYMBOLS);
  expect(translateNumber("21421 fafa fa1412")).toBe(NON_NUMERIC_SYMBOLS);
  expect(translateNumber("078*\/'].[],]]-+")).toBe(NON_NUMERIC_SYMBOLS);
  expect(translateNumber("1f")).toBe(NON_NUMERIC_SYMBOLS);
})

test("Extra symbols", () => {
  expect(translateNumber("22.2.212312321321")).toBe(EXTRA_SYMBOLS);
  expect(translateNumber("-2222222-222222")).toBe(EXTRA_SYMBOLS);
  expect(translateNumber("-222.-22.22")).toBe(EXTRA_SYMBOLS);
  expect(translateNumber("2222.2222.222.222.22.2.2-22.22.2.2-")).toBe(EXTRA_SYMBOLS);
})