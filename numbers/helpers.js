const { digits, from10To19, dozens, hundreds, categoryWords } = require("./word.forms.js");
const { twoLastDigits } = require("../utils.js");

const getDigit = number => digits[number];
const getDozens = number => dozens[number - 2];
const getHundreds = number => hundreds[number - 1];

function translateNumberLessThan100(number) {
  if(number < 10) return getDigit(Number(number));
  if(number < 20) return from10To19[number - 10];
  if(number < 100) {
    const [dozen, digit] = twoLastDigits(number)
    return getDozens(dozen) + translateLastDigit(digit)
  }
}
function translateLastDigit(number) {
  return number > 0 ? " " + digits[number] : "";
}
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