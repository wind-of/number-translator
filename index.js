;const { 
  translateLastDigit, 
  translateNumberLessThan100, 
  getDigit, 
  getDozens, 
  getHundreds, 
  getCategoryWord 
} = require("./numbers/helpers");
const { twoLastDigits, removeLastNSymbols } = require("./utils.js");

/**
 * @function getTranslatedNumberWithCorrespondingCategoryWord
 * @param {Number} number
 * A number with three or less digits. Example: "123", "21", "1", ...
 * @param {Number} category
 * Position of the number in the source number. Example: 5765123321 => 5(3) 756(2) 123(1) 321(0)
 * 
 * @returns A word equivalent of the "number".
 * @when The category is equal to zero.
 * 
 * @returns Word corresponding to the category.
 * @when The "number" is equal to zero or one in the numeric equivalent.
 * 
 * @returns A word equivalent of the "number" with a corresponding to the category word.
 * @when Otherwise.
 */
function getTranslatedNumberWithCorrespondingCategoryWord(number, category) {
  if(category === 0) return wordFrom(number);
  if(Number(number) === 0) return "";

  // There are some fun in category 1 :/
  if(category === 1) {
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
  return (translatedNumber ? translatedNumber + " " : "") + getCategoryWord(twoLastDigits(number), category)
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

function wordFrom(number) {
  if(number === undefined || number === null || isNaN(parseFloat(number))) return;
  if(typeof number !== "string" && !Number.isSafeInteger(number)) {
    return `Passed number is not safe. \nAvailable numbers are digit numbers in range [${Number.MIN_SAFE_INTEGER}; ${Number.MAX_SAFE_INTEGER}] \n...or pass the number wrapped in quotes.`;
  }
  number = number.toString();

  // Hanlding a negative number.
  if(number < 0) {
    return `минус ${wordFrom(number.slice(1))}`
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
  
  /**
   * @function sortDigitsToCorrespondingCategories
   * @param {Array<String>} categories 
   * An array where will contain categories of the source number.
   * @param {String} digit 
   * A string digit, one of "1", "2", "3", ..., "0".
   * @param {Number} idx 
   * Index of the current digit.
   * 
   * @return An array of number categories.
   */
  function sortDigitsToCorrespondingCategories(categories, digit, idx) {
    const currentDigitsCategory = Math.floor(idx / 3);
    categories[currentDigitsCategory] = digit + (categories[currentDigitsCategory] || "");
    return categories
  }
  /**
   * @function convertCategoriesOfNumbersToWords
   * @param {Array<String>} words 
   * An array where will contain word equivalents of numbers.
   * @param {String} number 
   * A string of numbers with three or less digits. Example: "123", "21", "1".
   * @param {Number} category 
   * Position of the number in the source number. Example: 5765123321 => 5(3) 756(2) 123(1) 321(0)
   * 
   * @return An array of translated words.
   */
  function convertCategoriesOfNumbersToWords(words, number, category) {
    const wordFromNumber = getTranslatedNumberWithCorrespondingCategoryWord(number, category);
    if(Boolean(wordFromNumber)) {
      words.push(wordFromNumber)
    };
    return words;
  }

  return number
    .split("")
    .reverse()
    .reduce(sortDigitsToCorrespondingCategories, new Array())
    .reduce(convertCategoriesOfNumbersToWords, new Array())
    .filter((number, __, arr) => arr.length > 1 ? (number !== "ноль") : true)
    .reverse()
    .join(" ")
}

module.exports = wordFrom
