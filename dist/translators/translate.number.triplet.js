"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.getTranslatedNumberWithClassWord = getTranslatedNumberWithClassWord
const word_specific_getters_1 = require("../numbers/word.specific.getters")
const two_last_digits_1 = require("../utils/two-last-digits")
const remove_last_n_symbols_1 = require("../utils/remove-last-n-symbols")
const translate_small_number_1 = require("./translate.small.number")
/**
 * @function getTranslatedNumberWithClassWord
 * @param {Number} number
 * A number with three or less digits. Example: "123", "21", "1", ...
 * @param {Number} classIndex
 * Position of the number in the source number. Example: 5765123321 => 5(3) 756(2) 123(1) 321(0)
 * @return {String}
 */
function getTranslatedNumberWithClassWord(number, classIndex) {
  if (classIndex === 0) {
    return (0, translate_small_number_1.translateThreeOrLessDigitNumber)(number)
  } else if (Number(number) === 0) {
    return ""
  }
  if (classIndex === 1) {
    const lastDigit = number.split("").pop()
    const translatedNumber = (0, translate_small_number_1.translateThreeOrLessDigitNumber)(number)
    // "... две тысячи".
    if (lastDigit === "2" && (0, two_last_digits_1.lastTwoChars)(number) !== "12") {
      return (0, remove_last_n_symbols_1.removeLastNSymbols)(translatedNumber, 3) + "две тысячи"
    }
    // "... одна тысяча".
    if (lastDigit === "1" && (0, two_last_digits_1.lastTwoChars)(number) !== "11") {
      return (0, remove_last_n_symbols_1.removeLastNSymbols)(translatedNumber, 4) + "одна тысяча"
    }
  }
  return `${(0, translate_small_number_1.translateThreeOrLessDigitNumber)(number)} ${(0, word_specific_getters_1.getClassWord)((0, two_last_digits_1.lastTwoChars)(number), classIndex)}`
}
