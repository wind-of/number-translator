const { getDigit, getDozens, getHundreds } = require("../numbers/word.primitive.getters");
const { digits, from10To19 } = require("../numbers/word.forms");
const { twoLastDigits } = require("../utils/two-last-digits");

/**
 * @function translateNumberLessThanThousand
 * Translates number that has less than four digits :/
 * @param {String} number 
 * A string of numbers with three or less digits. Example: "023", "201", "1"...
 * @return {String} Translated number.
 */
function translateNumberLessThanThousand(number) {
  if(number < 10) return getDigit(Number(number));
  if(number < 20) return from10To19[number - 10];
  if(number < 100) {
    const [dozen, digit] = twoLastDigits(number);
    return Number(digit) === 0 
        ? getDozens(dozen)
        : `${getDozens(dozen)} ${getDigit(digit)}`
  }

  const [firstDigit, ...rest] = number.split("");
  return Number(rest.join("")) === 0 
      ? getHundreds(firstDigit)
      : `${getHundreds(firstDigit)} ${translateNumberLessThanThousand(rest.join(""))}`
}

module.exports = { translateNumberLessThanThousand }
