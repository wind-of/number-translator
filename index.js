const { 
  translateLastDigit, 
  translateNumberLessThan100, 
  getDigit, 
  getDozens, 
  getHundreds, 
  getCategoryWord 
} = require("./numbers/helpers");

function getTranslatedNumberWithCorrespondingCategoryWord(number, category) {
  if(category === 0) return wordFrom(number);
  const translatedNumber = translateNumber(number);
  const twoLastDigits = number.split("").slice(number.length - 2).join("");
  return (translatedNumber ? translatedNumber + " " : "") + getCategoryWord(twoLastDigits, category)
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
  
  function sortDigitsToCorrespondingCategories(categories, digit, idx) {
    const currentDigitsCategory = Math.floor(idx / 3);
    categories[currentDigitsCategory] = digit + (categories[currentDigitsCategory] || "");
    return categories
  }
  function convertCategoriesOfNumbersToWords(words, number, category) {
    const wordFromNumber = getTranslatedNumberWithCorrespondingCategoryWord(number, category);
    if(Boolean(wordFromNumber)) words.push(wordFromNumber);
    return words;
  }

  return number
    .split("")
    .reverse()
    .reduce(sortDigitsToCorrespondingCategories, new Array())
    .reduce(convertCategoriesOfNumbersToWords, new Array())
    .reverse()
    .join(" ")
}

module.exports = wordFrom
