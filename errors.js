const errors = {
  NotSafeNumber:
`Passed number is not safe. Available numbers are numbers in range [${Number.MIN_SAFE_INTEGER}; ${Number.MAX_SAFE_INTEGER}].
You can pass the number wrapped in quotes to avoid this limitation.`,
  NotANumber: "Passed value is not a number.",
  nonNumericSymbols: "There are non-numeric symbols in the passed string."
}

module.exports = { errors }