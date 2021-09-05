const { NOT_A_NUMBER, NOT_SAFE_NUMBER, NON_NUMERIC_SYMBOLS, EXTRA_SYMBOLS, TOO_BIG_NUMBER } = require("./errors");
const { isSafeNumber } = require("../utils/is-safe-number");

module.exports = {
  findError(number) {
    const predicates = [
      { isInvalid: (number) => isNaN(parseFloat(number)), message: NOT_A_NUMBER },
      { isInvalid: (number) => !isSafeNumber(number), message: NOT_SAFE_NUMBER },
      { isInvalid: (number) => /[^0-9.\-]/.test(number.toString()), message: NON_NUMERIC_SYMBOLS },
      { isInvalid: (number, chars = number.toString()) => chars.indexOf(".") !== chars.lastIndexOf(".") || !({"0":true, "-1":true})[chars.lastIndexOf("-")], message: EXTRA_SYMBOLS },
      { isInvalid: (number) => {
        number = number < 0 ? number.toString().substring(1) : number.toString()
        if(number.indexOf(".") !== -1) {
          const [ int, nonInt ] = number.split(".")
          return int.length > 306 || nonInt.length > 305
        }
        return number.length > 306
      }, message: TOO_BIG_NUMBER }
    ]

    return (predicates.find(({ isInvalid }) => isInvalid(number)) || 0).message
  },
}
