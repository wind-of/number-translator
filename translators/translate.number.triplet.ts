import { getClassWord } from "../numbers/word.specific.getters"
import { getLastTwoChars, removeLastNSymbols } from "../utils"
import { translateThreeOrLessDigitNumber } from "./translate.small.number"

/**
 * @function getTranslatedNumberWithClassWord
 * @param {Number} number
 * A number with three or less digits. Example: "123", "21", "1", ...
 * @param {Number} classIndex
 * Position of the number in the source number. Example: 5765123321 => 5(3) 756(2) 123(1) 321(0)
 * @return {String}
 */
export function getTranslatedNumberWithClassWord(number: string, classIndex: number): string {
  if (classIndex === 0) {
    return translateThreeOrLessDigitNumber(number)
  } else if (Number(number) === 0) {
    return ""
  }
  if (classIndex === 1) {
    const lastDigit = number.split("").pop()
    const translatedNumber = translateThreeOrLessDigitNumber(number)
    // "... две тысячи".
    if (lastDigit === "2" && getLastTwoChars(number) !== "12") {
      return removeLastNSymbols(translatedNumber, 3) + "две тысячи"
    }
    // "... одна тысяча".
    if (lastDigit === "1" && getLastTwoChars(number) !== "11") {
      return removeLastNSymbols(translatedNumber, 4) + "одна тысяча"
    }
  }

  return `${translateThreeOrLessDigitNumber(number)} ${getClassWord(getLastTwoChars(number), classIndex)}`
}
