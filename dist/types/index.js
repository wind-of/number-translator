"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.NonIntegersPostfixesEnum = exports.ClassPostfixesEnum = exports.OutputTypesEnum = void 0
var OutputTypesEnum
;(function (OutputTypesEnum) {
  OutputTypesEnum["OUTPUT_TYPE_ERROR"] = "error"
  OutputTypesEnum["OUTPUT_TYPE_VALID"] = "valid"
})(OutputTypesEnum || (exports.OutputTypesEnum = OutputTypesEnum = {}))
var ClassPostfixesEnum
;(function (ClassPostfixesEnum) {
  ClassPostfixesEnum["ONE_THING_POSTFIX"] = ""
  ClassPostfixesEnum["FEW_THINGS_POSTFIX"] = "\u0430"
  ClassPostfixesEnum["MANY_OR_ZERO_THINGS_POSTFIX"] = "\u043E\u0432"
})(ClassPostfixesEnum || (exports.ClassPostfixesEnum = ClassPostfixesEnum = {}))
var NonIntegersPostfixesEnum
;(function (NonIntegersPostfixesEnum) {
  NonIntegersPostfixesEnum["ENDS_WITH_ONE"] = "\u0430\u044F"
  NonIntegersPostfixesEnum["OTHERWISE"] = "\u044B\u0445"
})(NonIntegersPostfixesEnum || (exports.NonIntegersPostfixesEnum = NonIntegersPostfixesEnum = {}))
