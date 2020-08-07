const { NotANumber, NotSafeNumber, nonNumericSymbols } = require("./errors");
const { isSafeNumber } = require("../utils/is-safe-number");

module.exports = {
  // WRONG NAME! FOLLOW SRP! 
  isValidNumber(number) {
    let result = "";
    const predicates = [
      [number => isNaN(parseFloat(number)), errors.NotANumber],
      [number => !isSafeNumber(number), errors.NotSafeNumber],
      [number => /[^0-9.\-]/.test(number.toString()), errors.nonNumericSymbols]
    ]
    predicates.some(([predicate, error]) => predicate(number) ? (result = error, true) : false)
    return result
  }
}
