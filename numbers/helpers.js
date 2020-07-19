const { digits, from10To19, dozens, hundreds, rateWords } = require("./word.forms");

const getDigit = number => digits[number];
const getDozens = number => dozens[number - 2];
const getHundreds = number => hundreds[number - 1];

function translateNumberLessThan100(number) {
  const numberDigits = number.split("");
  if(number < 10) return getDigit(number);
  if(number < 20) return from10To19[number - 10];
  if(number < 100) {
    const [dozen, digit] = numberDigits;
    return getDozens(dozen) + translateLastDigit(digit);
  }
}
function translateLastDigit(number) {
  return number > 0 ? " " + digits[number] : "";
}
function getRateWord(number, rate) {
  if(number == 1) return rateWords[rate][0];
  if(number < 5 && number > 1) return rateWords[rate][1];
  return rateWords[rate][2]
}

module.exports = {
  translateLastDigit,
  translateNumberLessThan100,
  getDigit,
  getDozens,
  getHundreds,
  getRateWord
}