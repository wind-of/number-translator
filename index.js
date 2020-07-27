;const { 
  translateLastDigit, 
  translateNumberLessThan100, 
  getDigit, 
  getDozens, 
  getHundreds, 
  getClassWord,
  getCategoryWordForNonIntegerPart
} = require("./numbers/helpers");
const { 
  twoLastDigits,
  removeLastNSymbols 
} = require("./utils.js");

function wordFrom(number) {
  if(isNaN(parseFloat(number))) return;
  if(
    typeof number !== "string" &&
    (number > Number.MAX_SAFE_INTEGER || number < Number.MIN_SAFE_INTEGER)
  ) {
    return `Passed number is not safe. \nAvailable numbers are numbers in range [${Number.MIN_SAFE_INTEGER}; ${Number.MAX_SAFE_INTEGER}] \n...or pass the number wrapped in quotes.`;
  }
  number = number.toString();

  // Hanlding a negative number.
  if(number < 0) {
    return `минус ${wordFrom(number.slice(1))}`
  }
  // Handling a non-integer.
  if(number.split("").indexOf(".") !== -1) {
    const [integerPart, nonIntegerPart] = number.split(".");
    const translatedNonIntegerPart = (() => {
      const translated = translateNonIntegerPart(nonIntegerPart);
      return translated !== "" ? ` ${translated}`: "";
    })();
    return wordFrom(integerPart) + " целых" + translatedNonIntegerPart
  }

  // Default...
  if(number < 100) {
    return translateNumberLessThan100(number)
  }
  if(number < 1000) {
    const [firstDigit, ...rest] = number.split("");
    const lastPart = Number(rest.join("")) === 0 ? "" : " " + wordFrom(rest.join(""));
    return getHundreds(firstDigit) + lastPart
  }

  function sortDigitsToCorrespondingClasses(classes, digit, idx) {
    const currentDigitsClass = Math.floor(idx / 3);
    classes[currentDigitsClass] = digit + (classes[currentDigitsClass] || "");
    return classes
  }
  function convertClassesOfNumbersToWords(words, number, class_) {
    const wordFromNumber = getTranslatedNumberWithCorrespondingClassWord(number, class_);
    if(Boolean(wordFromNumber)) {
      words.push(wordFromNumber)
    }
    return words
  }

  return number
    .split("")
    .reverse()
    .reduce(sortDigitsToCorrespondingClasses, new Array())
    .reduce(convertClassesOfNumbersToWords, new Array())
    .filter((number, __, arr) => arr.length > 1 ? (number !== "ноль") : true)
    .reverse()
    .join(" ")
}

/**
 * @function getTranslatedNumberWithCorrespondingClassWord
 * @param {Number} number
 * A number with three or less digits. Example: "123", "21", "1", ...
 * @param {Number} class_
 * Position of the number in the source number. Example: 5765123321 => 5(3) 756(2) 123(1) 321(0)
 * 
 * @returns A word equivalent of the "number".
 * @when The class is equal to zero.
 * 
 * @returns Word corresponding to the class.
 * @when The "number" is equal to zero or one in the numeric equivalent.
 * 
 * @returns A word equivalent of the "number" with a corresponding to the class word.
 * @when Otherwise.
 */
function getTranslatedNumberWithCorrespondingClassWord(number, class_) {
  if(class_ === 0) return wordFrom(number);
  if(Number(number) === 0) return "";

  // There are some fun in class 1 :/
  if(class_ === 1) {
    const lastDigit = number.split("").pop();
    // "Два миллиона", "два миллиарда", "два триллиона" ..., BUT(!) "две тысячи", "тридцать две тысячи", ...
    if(lastDigit === "2" && twoLastDigits(number) !== "12") {
      return removeLastNSymbols(wordFrom(number), 3) + "две тысячи"
    }
    // "Двадцать один миллион", "пятьдесять один миллиард" ..., BUT(!) "двадцать одна тысяча", "сорок одна тысяча", ...
    if(lastDigit === "1" && twoLastDigits(number) > "11") {
      return removeLastNSymbols(wordFrom(number), 4) + "одна тысяча"
    }
  }
  
  const translatedNumber = translateNumber(number);
  return (translatedNumber ? translatedNumber + " " : "") + getClassWord(twoLastDigits(number), class_)
}

/**
 * @function translateNumber
 * Gets word equivalent of the passed number.
 * @param {Number} number 
 * A number with three or less digits. Example: "123", "21", "1"
 * 
 * @returns Empty string (""). 
 * @when The "number" is equal to zero or one in the numeric equivalent.
 *
 * @returns A word equivalent of the "number".
 * @when Otherwise.
 */
function translateNumber(number) {
  return Number(number) === 1 ? "" : wordFrom(number);
}

/**
 * @function translateNonIntegerPart
 * Gets a special word of the some category of the number.
 * @param {String} number
 * A string number. 
 * 
 * @return Translated non-integer part.
 */
function translateNonIntegerPart(number) {
  if(!number || Number(number) === 0) {
    return ""
  }
  const translated = wordFrom(number);

  const twoLastDigits_ = twoLastDigits(number);
  const lastDigit = twoLastDigits_[1] || twoLastDigits_[0];
  const nonIntegerPartType = lastDigit === "1" && twoLastDigits_ !== "11" ? 0 : 1;
  return (
    nonIntegerPartType === 0 
      ? removeLastNSymbols(translated, 4) + "одна"
      : translated
    ) + ` ${getCategoryWordForNonIntegerPart(number.length, nonIntegerPartType)}` 
}

module.exports = wordFrom
