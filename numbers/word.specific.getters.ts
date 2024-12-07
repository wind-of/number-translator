import { CLASS_WORDS, NON_INTEGER_PART_CATEGORIES } from "../constants/word.forms"
import { ClassPostfixesEnum } from "../types"
import { lastTwoChars } from "../utils/two-last-digits"
import { inRange } from "../utils/in-range"

/**
 * @function getClassWord
 * Gets a special word of some class of number. Example: "тысяча", "миллион", "квадрагинтиллион", ...
 * @param {String} number
 * A string of numbers with three or less digits. Example: "123", "21", "1"...
 * @param {Number} classIndex
 * Position of the number in the source number. Example: 5765123321 => 5(3) 756(2) 123(1) 321(0).
 * @return {String} A string value that is a special class word.
 */
export function getClassWord(number: string, classIndex: number): string {
  return classIndex === 1
    ? computeWordForThousandsClass(number)
    : CLASS_WORDS[classIndex] + computePostfixForNumber(number)
}

/**
 * @function computePostfixForNumber
 * Computes a postfix of the passed number.
 * @param {String} number
 * String number.
 * @return {Number} Index of a certain postfix.
 */
export function computePostfixForNumber(number: string): string {
  const lastTwoDigits = lastTwoChars(number)
  const lastDigit = lastTwoDigits[1] || lastTwoDigits[0]

  if (inRange(Number(lastTwoDigits), [11, 19]) || lastDigit === "0" || Number(lastDigit) > 4) {
    return ClassPostfixesEnum.MANY_OR_ZERO_THINGS_POSTFIX
  }
  if (lastDigit === "1") {
    return ClassPostfixesEnum.ONE_THING_POSTFIX
  }
  return ClassPostfixesEnum.FEW_THINGS_POSTFIX
}
/**
 * @function computeWordForThousandsClass
 * Computes class word of thousands'
 * @param {String} number
 * String number.
 * @return {Number} Index of a certain postfix.
 */
export function computeWordForThousandsClass(number: string) {
  const lastTwoDigits = lastTwoChars(number)
  const lastDigit = lastTwoDigits[1] || lastTwoDigits[0]
  if (lastDigit === "1") {
    return "тысяча"
  }
  if (inRange(lastDigit, [2, 4]) && !inRange(lastTwoDigits, [12, 14])) {
    return "тысячи"
  }
  return "тысяч"
}

export function getCategoryWordForNonIntegerPart(category: number) {
  return NON_INTEGER_PART_CATEGORIES[category]
}
