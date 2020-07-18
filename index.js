const { digits, from10To19, dozens, hundreds, rateWords } = require("./utils/word.forms");


const getDigit = number => number > 0 ? " " + wordFrom(number) : "";
const getDozen = number => dozens[number - 2];
const getHundred = number => hundreds[number - 1];

const getWordWithRateWord = rate => rate === 0 ? wordFrom : number => wordWithRate(number, rate);
const wordWithRate = (number, rate) => {
  if(Number(number) === 0) return "";
  const lastDigit = number.toString().split("").pop();
  const word = number === "1" ? "" : wordFrom(number) + " ";
  return word + getCorrespondingRateWord(lastDigit, rate)
}
const getCorrespondingRateWord = (number, rate) => {
  if(number === "1") return rateWords[rate][0];
  if(number < 5 && number > 1) return rateWords[rate][1];
  return rateWords[rate][2]
};

function wordFrom(number) {
  if(number === undefined || number === null || isNaN(parseFloat(number))) return;
  number = number.toString();

  const numberDigits = number.split("");
  if(number < 10) return digits[number];
  if(number < 20) return from10To19[number - 10];
  if(number < 100) {
    return getDozen(numberDigits.shift()) + getDigit(numberDigits.join(""));
  }
  if(number < 1000) {
    const firstDigit = numberDigits.shift();
    const wordFromEndOfNumber = Number(numberDigits.join("")) === 0 ? "" : " " + wordFrom(numberDigits.join(""));
    return getHundred(firstDigit) + wordFromEndOfNumber;
  }
  
  const sortDigitsToCorrespondingRates = (rates, digit, idx) => {
    const digitRate = Math.floor(idx / 3);
    rates[digitRate] = digit + (rates[digitRate] || "");
    return rates
  }
  const convertRatesToWords = (words, number, rate) => {
    const wordFromNumber = getWordWithRateWord(rate)(number);
    if(Boolean(wordFromNumber)) words.push(wordFromNumber);
    return words;
  }

  return number
    .split("")
    .reverse()
    .reduce(sortDigitsToCorrespondingRates, new Array())
    .reduce(convertRatesToWords, new Array())
    .reverse()
    .join(" ")
}


module.exports = wordFrom
