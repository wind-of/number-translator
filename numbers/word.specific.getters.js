const { classWords, nonIntegerPartCategories } = require("./word.forms");
const { ClassPostfixes } = require("../constants/word.forms.const");
const { removeLastNSymbols } = require("../utils/remove-last-n-symbols");
const { twoLastDigits } = require("../utils/two-last-digits");
const { inRange } = require("../utils/in-range");

/**
 * @function getClassWord
 * Gets a special word of some class of number. Example: "тысяча", "миллион", "квадрагинтиллион", ...
 * @param {String} number 
 * A string of numbers with three or less digits. Example: "123", "21", "1"...
 * @param {Number} class_ 
 * Position of the number in the source number. Example: 5765123321 => 5(3) 756(2) 123(1) 321(0).
 * 
 * @return {String} A string value that is a special class word.
 */
function getClassWord(number, classIndex) {
  return classIndex === 1 
          ? computeWordForThousandsClass(number)
          : classWords[classIndex] + computePostfixForNumber(number)
}

/**
 * @function computePostfixForNumber
 * Computes a postfix of the passed number.
 * @param {String} number
 * String number.
 * 
 * @return {Number} Index of a certain postfix.
 */
function computePostfixForNumber(number) {
  const twoLastDigits_ = twoLastDigits(number);
  const lastDigit = twoLastDigits_[1] || twoLastDigits_[0];
  
  if(inRange(twoLastDigits_, [11, 19]) || lastDigit === "0" || lastDigit > 4) {
    return ClassPostfixes.MANY_OR_ZERO_THINGS_POSTFIX
  }
  if(lastDigit === "1") {
    return ClassPostfixes.ONE_THING_POSTFIX
  }
  return ClassPostfixes.FEW_THINGS_POSTFIX
}
/** 
 * @function computeWordForThousandsClass
 * Computes class word of thousands' 
 * @param {String} number
 * String number.
 * 
 * @return {Number} Index of a certain postfix.
*/
function computeWordForThousandsClass(number) {
  const twoLastDigits_ = twoLastDigits(number);
  const lastDigit = twoLastDigits_[1] || twoLastDigits_[0];
  if(lastDigit === "1") {
    return "тысяча"
  }
  if(inRange(lastDigit, [2, 4]) && !inRange(twoLastDigits_, [12, 14])) {
    return "тысячи"
  }
  return "тысяч"
}

function getCategoryWordForNonIntegerPart(category) {
  return nonIntegerPartCategories[category]
}

module.exports = {
  getClassWord, 
  getCategoryWordForNonIntegerPart
}
