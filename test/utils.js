const { translateNumber } = require("../index");

module.exports = {
  expectToBe: (argument, expected) => expect(translateNumber(argument)).toBe(expected)
}