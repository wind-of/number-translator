const errors = {
  NOT_SAFE_NUMBER:
  `The passed number is not safe. Safe numbers are numbers in range [${Number.MIN_SAFE_INTEGER}; ${Number.MAX_SAFE_INTEGER}].
  You can pass the number wrapped in quotes to avoid this limitation.`,
  NOT_A_NUMBER: "The passed value is not a number.",
  NON_NUMERIC_SYMBOLS: "There are non-numeric symbols in the passed string.",
  EXTRA_SYMBOLS: "The passed number isn't a valid number.",
  TOO_BIG_NUMBER: "The passed number is too big. Max. length is 306 digits for the integer part and 305 digits for the non-integer part."
}

module.exports = errors
