"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.findError = findError
const errors_1 = require("../constants/errors")
const utils_1 = require("../utils")
function findError(number) {
  var _a
  const predicates = [
    {
      isInvalid: (number) => isNaN(parseFloat(number.toString())),
      message: errors_1.NOT_A_NUMBER,
    },
    {
      isInvalid: (number) => !(0, utils_1.isNumberInSafeBound)(number),
      message: errors_1.NOT_SAFE_NUMBER,
    },
    {
      isInvalid: (number) => /[^0-9.\-]/.test(number.toString()),
      message: errors_1.NON_NUMERIC_SYMBOLS,
    },
    {
      isInvalid: (number, chars = number.toString()) =>
        chars.indexOf(".") !== chars.lastIndexOf(".") ||
        !{ 0: true, "-1": true }[chars.lastIndexOf("-")],
      message: errors_1.EXTRA_SYMBOLS,
    },
    {
      isInvalid: (number) => {
        number = number.toString()
        number = Number(number) < 0 ? number.substring(1) : number
        if (number.indexOf(".") !== -1) {
          const [int, nonInt] = number.split(".")
          return int.length > 306 || nonInt.length > 305
        }
        return number.length > 306
      },
      message: errors_1.TOO_BIG_NUMBER,
    },
  ]
  return (
    ((_a = predicates.find(({ isInvalid }) => isInvalid(number))) === null || _a === void 0
      ? void 0
      : _a.message) || ""
  )
}
