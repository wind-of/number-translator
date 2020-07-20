const { digits, from10To19, dozens, hundreds, categoryWords } = require("./word.forms");

const getDigit = number => digits[number];
const getDozens = number => dozens[number - 2];
const getHundreds = number => hundreds[number - 1];

function translateNumberLessThan100(number) {
  const numberDigits = number.split("");
  if(number < 10) return getDigit(number);
  if(number < 20) return from10To19[number - 10];
  if(number < 100) {
    const numberLength = numberDigits.length;
    const [dozen, digit] = numberDigits.slice(numberLength - 2, numberLength);
    return getDozens(dozen) + translateLastDigit(digit);
  }
}
function translateLastDigit(number) {
  return number > 0 ? " " + digits[number] : "";
}
function getCategoryWord(number, category) {
  if(number < 20 && number > 10) return categoryWords[category][2];
  
  const lastDigit = number.split("").pop();
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