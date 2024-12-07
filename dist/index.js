"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.translateNumber = translateNumber
const word_specific_getters_1 = require("./numbers/word.specific.getters")
const translate_small_number_1 = require("./translators/translate.small.number")
const translate_number_triplet_1 = require("./translators/translate.number.triplet")
const remove_last_n_symbols_1 = require("./utils/remove-last-n-symbols")
const two_last_digits_1 = require("./utils/two-last-digits")
const types_1 = require("./types")
const types_2 = require("./types")
const is_valid_number_1 = require("./validation/is-valid-number")
const prepare_number_1 = require("./utils/prepare-number")
const errors_1 = require("./constants/errors")
const output = (message, type) => ({ message, type })
function translateNumberSource(number) {
  if (Number(number) < 0) {
    return `минус ${translateNumberSource(number.toString().slice(1))}`
  }
  number = (0, prepare_number_1.prepareNumber)(number)
  if (number.includes(".")) {
    const [integerPart, nonIntegerPart] = number.split(".")
    const integerPartTranslation = translateNumberSource(integerPart)
    const translatedNonIntegerPart = translateNonIntegerPart(nonIntegerPart)
    const integerPartEndsWithOne =
      integerPartTranslation.substring(integerPartTranslation.length - 4) === "один"
    if (translatedNonIntegerPart === "") {
      return integerPartTranslation
    }
    if (integerPartEndsWithOne) {
      return `${integerPartTranslation.substring(0, integerPartTranslation.length - 2) + "на"} целая ${translatedNonIntegerPart}`
    }
    return `${integerPartTranslation} целых ${translatedNonIntegerPart}`
  }
  if (Number(number) < 1000) {
    return (0, translate_small_number_1.translateThreeOrLessDigitNumber)(number)
  }
  const translatedParts = []
  for (
    let classIndex = 0;
    ;
    classIndex++, number = (0, remove_last_n_symbols_1.removeLastNSymbols)(number, 3)
  ) {
    if (number.length < 4) {
      const wordFromNumber = (0, translate_number_triplet_1.getTranslatedNumberWithClassWord)(
        number,
        classIndex
      )
      if (wordFromNumber) {
        translatedParts.unshift(wordFromNumber)
      }
      break
    }
    const triplet = number.slice(number.length - 3, number.length)
    const wordFromTriplet = (0, translate_number_triplet_1.getTranslatedNumberWithClassWord)(
      triplet,
      classIndex
    )
    if (classIndex === 0 && wordFromTriplet === "ноль") {
      continue
    }
    if (wordFromTriplet) {
      translatedParts.unshift(wordFromTriplet)
    }
  }
  return translatedParts.join(" ")
}
/**
 * @function translateNonIntegerPart
 * Gets a special word of the some category of the number.
 * @param {String} number
 * A string number.
 *
 * @return {String} Translated non-integer part.
 */
function translateNonIntegerPart(number) {
  if (Number(number) === 0) {
    return ""
  }
  for (let i = number.length - 1; number[i] === "0"; i--)
    if (number[i - 1] !== "0") number = number.substring(0, i)
  const translated = translateNumberSource(number)
  const lastTwoDigits = (0, two_last_digits_1.lastTwoChars)(number)
  const lastDigit = lastTwoDigits[1] || lastTwoDigits[0]
  const nonIntegerPartType =
    lastDigit === "1" && lastTwoDigits !== "11"
      ? types_1.NonIntegersPostfixesEnum.ENDS_WITH_ONE
      : types_1.NonIntegersPostfixesEnum.OTHERWISE
  return (
    (nonIntegerPartType === types_1.NonIntegersPostfixesEnum.ENDS_WITH_ONE
      ? (0, remove_last_n_symbols_1.removeLastNSymbols)(translated, 4) + "одна"
      : translated) +
    ` ${(0, word_specific_getters_1.getCategoryWordForNonIntegerPart)(number.length)}` +
    nonIntegerPartType
  )
}
function translateNumber(input) {
  if (!["string", "number"].includes(typeof input)) {
    return output(errors_1.NOT_A_NUMBER, types_2.OutputTypesEnum.OUTPUT_TYPE_ERROR)
  }
  const error = (0, is_valid_number_1.findError)(input)
  return error
    ? output(String(error), types_2.OutputTypesEnum.OUTPUT_TYPE_ERROR)
    : output(translateNumberSource(input.toString()), types_2.OutputTypesEnum.OUTPUT_TYPE_VALID)
}
