"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.expectToBe = expectToBe
const index_1 = require("../index")
const types_1 = require("../types")
function expectToBe(argument, expected, error = false) {
  return expect((0, index_1.translateNumber)(argument)).toEqual({
    message: expected,
    type: error
      ? types_1.OutputTypesEnum.OUTPUT_TYPE_ERROR
      : types_1.OutputTypesEnum.OUTPUT_TYPE_VALID,
  })
}
