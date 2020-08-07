const { NotANumber, NotSafeNumber, nonNumericSymbols } = require("./errors");
const { isSafeNumber } = require("../utils/is-safe-number");

module.exports = {
  findError(number) {
    const predicates = [
      { isInvalid: number => isNaN(parseFloat(number)), message: NotANumber },
      { isInvalid: number => !isSafeNumber(number), message: NotSafeNumber },
      { isInvalid: number => /[^0-9.\-]/.test(number.toString()), message: nonNumericSymbols }
    ]
    const error = predicates.find(({ isInvalid }) => isInvalid(number))
    if(error !== undefined) {
      return error.message
    }
  }
}
