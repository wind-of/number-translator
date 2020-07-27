const wordFrom = require("../index");
module.exports = {
  expectToBe: (argument, expected) => expect(wordFrom(argument)).toBe(expected)
}