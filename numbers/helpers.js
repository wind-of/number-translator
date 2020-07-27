const { 
  digits, 
  from10To19, 
  dozens, 
  hundreds, 
  classWords,
  nonIntegerPartCategories
} = require("./word.forms.js");
const { twoLastDigits } = require("../utils.js");

const getDigit = number => digits[number];
const getDozens = number => dozens[number - 2];
const getHundreds = number => hundreds[number - 1];

/**
 * @function translateNumberLessThat100
 * Translates number that is less than 100 :/
 * @param {String} number 
 * A string of numbers with three or less digits. Example: "023", "201", "1"...
 * 
 * @return Translated number.
 */
function translateNumberLessThan100(number) {
  if(number < 10) return getDigit(Number(number));
  if(number < 20) return from10To19[number - 10];
  if(number < 100) {
    const [dozen, digit] = twoLastDigits(number);
    return getDozens(dozen) + translateLastDigit(digit)
  }
}

/**
 * @function translateLastDigit
 * Checks if number is equal to zero.
 * @param {String} number 
 * String digit.
 * 
 * @return An empty string.
 * @When number == 0.
 * 
 * @return A string with space symbol and digit.
 * @when Otherwise. 
 */
function translateLastDigit(number) {
  return number != 0 ? " " + digits[number] : "";
}

/**
 * @function getClassWord
 * Gets a special word of some class of number. Example: "тысяча", "миллион", "квадрагинтиллион", ...
 * @param {String} number 
 * A string of numbers with three or less digits. Example: "123", "21", "1"...
 * @param {Number} class 
 * Position of the number in the source number. Example: 5765123321 => 5(3) 756(2) 123(1) 321(0).
 * 
 * @return A string value that is a special class word.
 */
function getClassWord(number, class_) {
  const twoLastDigits_ = twoLastDigits(number);
  if(twoLastDigits_ < 20 && twoLastDigits_ > 10) {
    return classWords[class_][2]
  }
  
  const lastDigit = twoLastDigits_[1] || twoLastDigits_[0];
  if(lastDigit == 1) {
    return classWords[class_][0]
  }
  if(lastDigit < 5 && lastDigit > 1) {
    return classWords[class_][1]
  }

  return classWords[class_][2]
}

function getCategoryWordForNonIntegerPart(category, type) {
  return nonIntegerPartCategories[category][type]
}

module.exports = {
  translateLastDigit,
  translateNumberLessThan100,
  getDigit,
  getDozens,
  getHundreds,
  getClassWord,
  getCategoryWordForNonIntegerPart
}
