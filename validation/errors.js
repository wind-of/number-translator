const errors = {
  NOT_SAFE_NUMBER:
  `Passed number is not safe. Available numbers are numbers in range [${Number.MIN_SAFE_INTEGER}; ${Number.MAX_SAFE_INTEGER}].
  You can pass the number wrapped in quotes to avoid this limitation.`,
  NOT_A_NUMBER: "Passed value is not a number.",
  NON_NUMERIC_SYMBOLS: "There are non-numeric symbols in the passed string.",
}

module.exports = errors
