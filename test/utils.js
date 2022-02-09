const { translateNumber } = require("../index");
const { OUTPUT_TYPE_VALID, OUTPUT_TYPE_ERROR } = require("../constants/output.types")

module.exports = {
  expectToBe: (argument, expected, error = false) => expect(translateNumber(argument)).toEqual({message: expected, type: error ? OUTPUT_TYPE_ERROR : OUTPUT_TYPE_VALID})
}