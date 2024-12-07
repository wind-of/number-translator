"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.TOO_BIG_NUMBER =
  exports.EXTRA_SYMBOLS =
  exports.NON_NUMERIC_SYMBOLS =
  exports.NOT_A_NUMBER =
  exports.NOT_SAFE_NUMBER =
    void 0
exports.NOT_SAFE_NUMBER = `Passed number is not safe. Safe numbers are numbers in range [${Number.MIN_SAFE_INTEGER}; ${Number.MAX_SAFE_INTEGER}].
You can pass the number wrapped in quotes to avoid this limitation.`
exports.NOT_A_NUMBER = "Passed value is not a number."
exports.NON_NUMERIC_SYMBOLS = "There are non-numeric symbols in the passed string."
exports.EXTRA_SYMBOLS = "Passed number isn't a valid number."
exports.TOO_BIG_NUMBER =
  "Passed number is too big. Max. length is 306 digits for the integer part and 305 digits for the non-integer part."
