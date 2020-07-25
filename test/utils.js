const wordFrom = require("../index");
const expectToBe = (argument, expected) => expect(wordFrom(argument)).toBe(expected);
module.exports = {
  expectToBe
}