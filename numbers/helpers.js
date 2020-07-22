const { digits, from10To19, dozens, hundreds, categoryWords } = require("./word.forms.js");
const { twoLastDigits } = require("../utils.js");

const getDigit = number => digits[number];
const getDozens = number => dozens[number - 2];
const getHundreds = number => hundreds[number - 1];

/**
 * @function translateNumberLessThat100
 * Translates number that is less than 100 :/
 * @param {String} number 
 * A string of numbers with three or less digits. Example: "023", "021", "1"...
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
 * @function getCategoryWord
 * Gets a special word of some category of number. Example: "тысяча", "миллион", "квадрагинтиллион", ...
 * @param {String} number 
 * A string of numbers with three or less digits. Example: "123", "21", "1"...
 * @param {Number} category 
 * Position of the number in the source number. Example: 5765123321 => 5(3) 756(2) 123(1) 321(0).
 * 
 * @return A string value that is a special category word.
 */
function getCategoryWord(number, category) {
  const _twoLastDigits = twoLastDigits(number);
  if(_twoLastDigits < 20 && _twoLastDigits > 10) return categoryWords[category][2];
  
  const lastDigit = _twoLastDigits[1] || _twoLastDigits[0];
  if(lastDigit == 1) return categoryWords[category][0];
  if(lastDigit < 5 && lastDigit > 1) return categoryWords[category][1];

  return categoryWords[category][2]
}

module.exports = {
  translateLastDigit,
  translateNumberLessThan100,
  getDigit,
  getDozens,
  getHundreds,
  getCategoryWord
}