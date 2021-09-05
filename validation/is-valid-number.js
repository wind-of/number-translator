const { NOT_A_NUMBER, NOT_SAFE_NUMBER, NON_NUMERIC_SYMBOLS, EXTRA_SYMBOLS } = require("./errors");
const { isSafeNumber } = require("../utils/is-safe-number");

module.exports = {
  findError(number) {
    const predicates = [
      { isInvalid: (number) => isNaN(parseFloat(number)), message: NOT_A_NUMBER },
      { isInvalid: (number) => !isSafeNumber(number), message: NOT_SAFE_NUMBER },
      { isInvalid: (number) => /[^0-9.\-]/.test(number.toString()), message: NON_NUMERIC_SYMBOLS },
      { isInvalid: (a, chars = a.toString()) => chars.indexOf(".") !== chars.lastIndexOf(".") || !({"0":true, "-1":true})[chars.lastIndexOf("-")], message: EXTRA_SYMBOLS}
    ]

    return (predicates.find(({ isInvalid }) => isInvalid(number)) || 0).message
  }
}
