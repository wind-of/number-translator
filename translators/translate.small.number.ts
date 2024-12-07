import { getDigit, getDozens, getHundreds } from "../numbers/word.primitive.getters"
import { FROM_10_TO_19 } from "../constants/word.forms"
import { getLastTwoChars } from "../utils"

/**
 * @function translateThreeOrLessDigitNumber
 * Translates number that has less than four digits :/
 * @param {String} number
 * A string of numbers with three or less digits. Example: "023", "201", "1"...
 * @return {String} Translated number.
 */
export function translateThreeOrLessDigitNumber(number_: string): string {
  const number = Number(number_)
  if (number < 10) return getDigit(number)
  if (number < 20) return FROM_10_TO_19[number - 10]
  if (number < 100) {
    const [dozen, digit] = getLastTwoChars(number.toString())
    return Number(digit) === 0 ? getDozens(dozen) : `${getDozens(dozen)} ${getDigit(digit)}`
  }

  const [firstDigit, ...rest] = number.toString().split("")
  return Number(rest.join("")) === 0
    ? getHundreds(firstDigit)
    : `${getHundreds(firstDigit)} ${translateThreeOrLessDigitNumber(rest.join(""))}`
}
