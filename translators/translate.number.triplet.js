const { translateThreeOrLessDigitNumber } = require("./translate.small.number");
const { removeLastNSymbols } = require("../utils/remove-last-n-symbols");
const { lastTwoChars } = require("../utils/two-last-digits");
const { getClassWord } = require("../numbers/word.specific.getters");

/**
 * @function getTranslatedNumberWithClassWord
 * @param {Number} number
 * A number with three or less digits. Example: "123", "21", "1", ...
 * @param {Number} classIndex
 * Position of the number in the source number. Example: 5765123321 => 5(3) 756(2) 123(1) 321(0)
 * @return {String}
 */
function getTranslatedNumberWithClassWord(number, classIndex) {
  if(classIndex === 0) {
    return translateThreeOrLessDigitNumber(number)
  } else if(Number(number) === 0) {
    return "";
  }
  if(classIndex === 1) {
    const lastDigit = number.split("").pop();
    const translatedNumber = translateThreeOrLessDigitNumber(number);
    // "... две тысячи".
    if(lastDigit === "2" && lastTwoChars(number) !== "12") {
      return removeLastNSymbols(translatedNumber, 3) + "две тысячи"
    }
    // "... одна тысяча".
    if(lastDigit === "1" && lastTwoChars(number) !== "11") {
      return removeLastNSymbols(translatedNumber, 4) + "одна тысяча"
    }
  } 

  return `${translateThreeOrLessDigitNumber(number)} ${getClassWord(lastTwoChars(number), classIndex)}`
}

module.exports = {
  getTranslatedNumberWithClassWord
}