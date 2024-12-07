"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.getClassWord = getClassWord
exports.computePostfixForNumber = computePostfixForNumber
exports.computeWordForThousandsClass = computeWordForThousandsClass
exports.getCategoryWordForNonIntegerPart = getCategoryWordForNonIntegerPart
const word_forms_1 = require("../constants/word.forms")
const types_1 = require("../types")
const two_last_digits_1 = require("../utils/two-last-digits")
const in_range_1 = require("../utils/in-range")
/**
 * @function getClassWord
 * Gets a special word of some class of number. Example: "тысяча", "миллион", "квадрагинтиллион", ...
 * @param {String} number
 * A string of numbers with three or less digits. Example: "123", "21", "1"...
 * @param {Number} classIndex
 * Position of the number in the source number. Example: 5765123321 => 5(3) 756(2) 123(1) 321(0).
 * @return {String} A string value that is a special class word.
 */
function getClassWord(number, classIndex) {
  return classIndex === 1
    ? computeWordForThousandsClass(number)
    : word_forms_1.CLASS_WORDS[classIndex] + computePostfixForNumber(number)
}
/**
 * @function computePostfixForNumber
 * Computes a postfix of the passed number.
 * @param {String} number
 * String number.
 * @return {Number} Index of a certain postfix.
 */
function computePostfixForNumber(number) {
  const lastTwoDigits = (0, two_last_digits_1.lastTwoChars)(number)
  const lastDigit = lastTwoDigits[1] || lastTwoDigits[0]
  if (
    (0, in_range_1.inRange)(Number(lastTwoDigits), [11, 19]) ||
    lastDigit === "0" ||
    Number(lastDigit) > 4
  ) {
    return types_1.ClassPostfixesEnum.MANY_OR_ZERO_THINGS_POSTFIX
  }
  if (lastDigit === "1") {
    return types_1.ClassPostfixesEnum.ONE_THING_POSTFIX
  }
  return types_1.ClassPostfixesEnum.FEW_THINGS_POSTFIX
}
/**
 * @function computeWordForThousandsClass
 * Computes class word of thousands'
 * @param {String} number
 * String number.
 * @return {Number} Index of a certain postfix.
 */
function computeWordForThousandsClass(number) {
  const lastTwoDigits = (0, two_last_digits_1.lastTwoChars)(number)
  const lastDigit = lastTwoDigits[1] || lastTwoDigits[0]
  if (lastDigit === "1") {
    return "тысяча"
  }
  if (
    (0, in_range_1.inRange)(lastDigit, [2, 4]) &&
    !(0, in_range_1.inRange)(lastTwoDigits, [12, 14])
  ) {
    return "тысячи"
  }
  return "тысяч"
}
function getCategoryWordForNonIntegerPart(category) {
  return word_forms_1.NON_INTEGER_PART_CATEGORIES[category]
}
