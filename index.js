const { getCategoryWordForNonIntegerPart } = require("./numbers/word.specific.getters");
const { translateThreeOrLessDigitNumber } = require("./translators/translate.small.number");
const { getTranslatedNumberWithClassWord } = require("./translators/translate.number.triplet");
const { removeLastNSymbols } = require("./utils/remove-last-n-symbols");
const { lastTwoChars } = require("./utils/two-last-digits");
const { NonIntegersPostfixes } = require("./constants/word.postfixes.const");
const { findError } = require("./validation/is-valid-number");
const { prepareNumber } = require("./utils/prepare-number");


function translateNumber(number) {
  const error = findError(number);
  if(error) return error;

  // Negative
  if(number < 0) {
    return `минус ${translateNumber(number.toString().slice(1))}`
  }

  number = prepareNumber(number);
  
  
  if(number.includes(".")) {
    const [integerPart, nonIntegerPart] = number.split(".");
    const integerPartTranslation = translateNumber(integerPart);
    const translatedNonIntegerPart = translateNonIntegerPart(nonIntegerPart);
    const integerPartEndsWithOne = integerPartTranslation.substring(integerPartTranslation.length - 4) === "один"
    if(translatedNonIntegerPart === "") {
      return integerPartTranslation
    }
    if(integerPartEndsWithOne) {
      return `${integerPartTranslation.substring(0, integerPartTranslation.length - 2) + "на"} целая ${translatedNonIntegerPart}`
    }
    return `${integerPartTranslation} целых ${translatedNonIntegerPart}`
  }

  if(number < 1000) {
    return translateThreeOrLessDigitNumber(number)
  }

  const translatedParts = [];
  for(let classIndex = 0;; classIndex++, number = removeLastNSymbols(number, 3)) {
    if(number.length < 4) {
      const wordFromNumber = getTranslatedNumberWithClassWord(number, classIndex);
      if(wordFromNumber) {
        translatedParts.unshift(wordFromNumber)
      }
      break
    }
    const triplet = number.slice(number.length - 3, number.length);
    const wordFromTriplet = getTranslatedNumberWithClassWord(triplet, classIndex);
    if(classIndex === 0 && wordFromTriplet === "ноль") {
      continue
    }
    if(wordFromTriplet) {
      translatedParts.unshift(wordFromTriplet)
    }
  }
  return translatedParts.join(" ")
}

/**
 * @function translateNonIntegerPart
 * Gets a special word of the some category of the number.
 * @param {String} number
 * A string number. 
 * 
 * @return {String} Translated non-integer part.
 */
function translateNonIntegerPart(number) {
  if(Number(number) === 0) {
    return ""
  }

  // 0.1000 === 0.1
  for(let i = number.length - 1; number[i] === "0"; i--)
    if(number[i - 1] !== "0")
      number = number.substring(0, i)
  

  const translated = translateNumber(number);
  const lastTwoDigits = lastTwoChars(number);
  const lastDigit = lastTwoDigits[1] || lastTwoDigits[0];
  const nonIntegerPartType = lastDigit === "1" && lastTwoDigits !== "11" 
      ? NonIntegersPostfixes.ENDS_WITH_ONE 
      : NonIntegersPostfixes.OTHERWISE;

  return (
    nonIntegerPartType === NonIntegersPostfixes.ENDS_WITH_ONE
      ? removeLastNSymbols(translated, 4) + "одна"
      : translated
    ) + ` ${getCategoryWordForNonIntegerPart(number.length)}` + nonIntegerPartType
}

module.exports = {
  translateNumber
}
