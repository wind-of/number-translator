const { translateNumber } = require("../index")
const { OUTPUT_TYPE_VALID, OUTPUT_TYPE_ERROR } = require("../constants/output.types")

export function expectToBe(argument: any, expected: string, error = false): void {
  return expect(translateNumber(argument)).toEqual({
    message: expected,
    type: error ? OUTPUT_TYPE_ERROR : OUTPUT_TYPE_VALID,
  })
}
