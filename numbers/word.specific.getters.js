const { classWords, nonIntegerPartCategories } = require("./word.forms");
const { Classes } = require("../constants/word.forms.const");
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
function getClassWord(number, class_) {
  const twoLastDigits_ = twoLastDigits(number);
  const lastDigit = twoLastDigits_[1] || twoLastDigits_[0];
  const currentClass = classWords[class_];
  
  if(twoLastDigits_ < 20 && twoLastDigits_ > 10) return currentClass[Classes.MANY_OR_ZERO_THINGS];
  if(lastDigit === "1") return currentClass[Classes.ONE_THING];
  if(lastDigit < 5 && lastDigit > 1) return currentClass[Classes.FEW_THINGS];

  return currentClass[Classes.MANY_OR_ZERO_THINGS]
}

function getCategoryWordForNonIntegerPart(category, type) {
  return nonIntegerPartCategories[category][type]
}

module.exports = {
  getClassWord, 
  getCategoryWordForNonIntegerPart
}
