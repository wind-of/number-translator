const { 
  translateLastDigit, 
  translateNumberLessThan100, 
  getDigit, 
  getDozens, 
  getHundreds, 
  getRateWord 
} = require("./numbers/helpers");

function getTranslatedNumberWithCorrespondingRateWord(number, rate) {
  if(rate === 0) return wordFrom(number);
  const translatedNumber = translateNumber(number);
  const twoLastDigits = number.split("").slice(number.length - 2).join("");
  return (translatedNumber ? translatedNumber + " " : "") + getRateWord(twoLastDigits, rate)
}

function translateNumber(number) {
  return [0, 1].includes(Number(number)) ? "" : wordFrom(number);
}

function wordFrom(number) {
  if(number === undefined || number === null || isNaN(parseFloat(number))) return;
  number = number.toString();
  
  if(number < 100) return translateNumberLessThan100(number);
  if(number < 1000) {
    const [firstDigit, ...rest] = number.split("");
    const wordFromEndOfNumber = Number(rest.join("")) === 0 ? "" : " " + wordFrom(rest.join(""));
    return getHundreds(firstDigit) + wordFromEndOfNumber
  }
  
  const sortDigitsToCorrespondingRates = (rates, digit, idx) => {
    const currentDigitsRate = Math.floor(idx / 3);
    rates[currentDigitsRate] = digit + (rates[currentDigitsRate] || "");
    return rates
  }
  const convertRatesOfNumbersToWords = (words, number, rate) => {
    const wordFromNumber = getTranslatedNumberWithCorrespondingRateWord(number, rate);
    if(Boolean(wordFromNumber)) words.push(wordFromNumber);
    return words;
  }

  return number
    .split("")
    .reverse()
    .reduce(sortDigitsToCorrespondingRates, new Array())
    .reduce(convertRatesOfNumbersToWords, new Array())
    .reverse()
    .join(" ")
}

module.exports = wordFrom
