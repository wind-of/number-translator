"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.translateThreeOrLessDigitNumber = translateThreeOrLessDigitNumber
const word_primitive_getters_1 = require("../numbers/word.primitive.getters")
const word_forms_1 = require("../constants/word.forms")
const two_last_digits_1 = require("../utils/two-last-digits")
/**
 * @function translateThreeOrLessDigitNumber
 * Translates number that has less than four digits :/
 * @param {String} number
 * A string of numbers with three or less digits. Example: "023", "201", "1"...
 * @return {String} Translated number.
 */
function translateThreeOrLessDigitNumber(number_) {
  const number = Number(number_)
  if (number < 10) return (0, word_primitive_getters_1.getDigit)(number)
  if (number < 20) return word_forms_1.FROM_10_TO_19[number - 10]
  if (number < 100) {
    const [dozen, digit] = (0, two_last_digits_1.lastTwoChars)(number.toString())
    return Number(digit) === 0
      ? (0, word_primitive_getters_1.getDozens)(dozen)
      : `${(0, word_primitive_getters_1.getDozens)(dozen)} ${(0, word_primitive_getters_1.getDigit)(digit)}`
  }
  const [firstDigit, ...rest] = number.toString().split("")
  return Number(rest.join("")) === 0
    ? (0, word_primitive_getters_1.getHundreds)(firstDigit)
    : `${(0, word_primitive_getters_1.getHundreds)(firstDigit)} ${translateThreeOrLessDigitNumber(rest.join(""))}`
}
