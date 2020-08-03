;const { getClassWord, getCategoryWordForNonIntegerPart } = require("./numbers/word.specific.getters");
const { translateNumberLessThanThousand } = require("./translators/translate.small.numbers");
const { getTranslatedNumberWithClassWord } = require("./translators/translate.number.triplet");
const { removeLastNSymbols } = require("./utils/remove-last-n-symbols");
const { twoLastDigits } = require("./utils/two-last-digits");
const { isSafeNumber } = require("./utils/is-safe-number");
const { getHundreds } = require("./numbers/word.primitive.getters");
const { NonIntegersPostfixes } = require("./constants/word.postfixes.const");
const { errors } = require("./errors");

function translateNumber(number) {
  if(isNaN(parseFloat(number))) return errors.NotANumber;
  if(!isSafeNumber(number)) return errors.NotSafeNumber;
  number = number.toString();
  
  // Negative handler.
  if(number < 0) {
    return `минус ${wordFrom(number.slice(1))}`
  }
  // Non-integer handler.
  if(number.split("").indexOf(".") !== -1) {
    const [integerPart, nonIntegerPart] = number.split(".");
    const translatedNonIntegerPart = translateNonIntegerPart(nonIntegerPart);
    return translatedNonIntegerPart === "" 
        ? wordFrom(integerPart)
        :`${wordFrom(integerPart)} целых ${translatedNonIntegerPart}`
  }
  // Default .
  if(number < 1000) {
    return translateNumberLessThanThousand(number)
  }

  const translatedParts = [];
  for(let classIndex = 0;; classIndex++, number = removeLastNSymbols(number, 3)) {
    if(number.length < 4) {
      const wordFromNumber = getTranslatedNumberWithClassWord(number, classIndex);
      if(wordFromNumber !== "") {
        translatedParts.unshift(wordFromNumber)
      };
      break
    }
    const triplet = number.slice(number.length - 3, number.length);
    const wordFromTriplet = getTranslatedNumberWithClassWord(triplet, classIndex);
    if(classIndex === 0 && wordFromTriplet === "ноль" && number.length > 3) {
      continue
    }
    if(wordFromTriplet !== "") {
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
  const translated = translateNumber(number);
  const twoLastDigits_ = twoLastDigits(number);
  const lastDigit = twoLastDigits_[1] || twoLastDigits_[0];
  const nonIntegerPartType = lastDigit === "1" && twoLastDigits_ !== "11" 
        ? NonIntegersPostfixes.ENDS_WITH_ONE 
        : NonIntegersPostfixes.OTHERWISE;

  return (
    nonIntegerPartType === NonIntegersPostfixes.ENDS_WITH_ONE
      ? removeLastNSymbols(translated, 4) + "одна"
      : translated
    ) + ` ${getCategoryWordForNonIntegerPart(number.length)}` + nonIntegerPartType
}

module.exports = translateNumber
