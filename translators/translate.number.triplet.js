const { translateNumberLessThanThousand } = require("./translate.small.numbers");
const { removeLastNSymbols } = require("../utils/remove-last-n-symbols");
const { twoLastDigits } = require("../utils/two-last-digits");
const { getClassWord } = require("../numbers/word.specific.getters");

/**
 * @function getTranslatedNumberWithClassWord
 * @param {Number} number
 * A number with three or less digits. Example: "123", "21", "1", ...
 * @param {Number} classIndex
 * Position of the number in the source number. Example: 5765123321 => 5(3) 756(2) 123(1) 321(0)
 * 
 * @return {String} A word equivalent of the "number".
 * @when The class is equal to zero.
 * 
 * @return {String} Word corresponding to the class.
 * @when The "number" is equal to zero or one in the numeric equivalent.
 * 
 * @return {String} A word equivalent of the "number" with a corresponding to the class word.
 * @when Otherwise.
 */
function getTranslatedNumberWithClassWord(number, classIndex) {
  if(classIndex === 0) return translateNumberLessThanThousand(number);
  if(Number(number) === 0) return "";
  
  if(classIndex === 1) {
    const lastDigit = number.split("").pop();
    const translatedNumber = translateNumberLessThanThousand(number);
    // "Два миллиона", BUT(!) "... две тысячи", 
    if(lastDigit === "2" && twoLastDigits(number) !== "12") {
      return removeLastNSymbols(translatedNumber, 3) + "две тысячи"
    }
    // "Двадцать один миллион", BUT(!) "двадцать одна тысяча"
    if(lastDigit === "1" && twoLastDigits(number) !== "11") {
      return removeLastNSymbols(translatedNumber, 4) + "одна тысяча"
    }
  } 

  const translatedNumber = translateNumberLessThanThousand(number);
  const classWord = getClassWord(twoLastDigits(number), classIndex);
  return `${translatedNumber} ${classWord}`
}

module.exports = {
  getTranslatedNumberWithClassWord
}