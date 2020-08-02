const { classWords, nonIntegerPartCategories } = require("./word.forms");
const { ClassPostfixes } = require("../constants/word.forms.const");
const { twoLastDigits } = require("../utils/utils");

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
  return classWords[classIndex][computePostfixIndex(number)]
}
/**
 * @function computePostfix
 * Computes an index of the postfix for the passed number.
 * @param {String} number
 * String number.
 * 
 * @return {Number} Index of a certain postfix.
 */
function computePostfixIndex(number) {
  const twoLastDigits_ = twoLastDigits(number);
  const lastDigit = twoLastDigits_[1] || twoLastDigits_[0];
  const postfixArrays = Object.values(ClassPostfixes);

  return ClassPostfixes.MANY_OR_ZERO_THINGS_POSTFIX.includes(twoLastDigits_)
          ? postfixArrays.indexOf(ClassPostfixes.MANY_OR_ZERO_THINGS_POSTFIX)
          : postfixArrays.findIndex(array => array.includes(lastDigit))
}

function getCategoryWordForNonIntegerPart(category, type) {
  return nonIntegerPartCategories[category][type]
}

module.exports = {
  getClassWord, 
  getCategoryWordForNonIntegerPart
}
