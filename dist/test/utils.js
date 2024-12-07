"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.expectToBe = expectToBe
const { translateNumber } = require("../index")
const { OUTPUT_TYPE_VALID, OUTPUT_TYPE_ERROR } = require("../constants/output.types")
function expectToBe(argument, expected, error = false) {
  return expect(translateNumber(argument)).toEqual({
    message: expected,
    type: error ? OUTPUT_TYPE_ERROR : OUTPUT_TYPE_VALID,
  })
}
