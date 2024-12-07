import { getCategoryWordForNonIntegerPart } from "./numbers/word.specific.getters"
import { translateThreeOrLessDigitNumber } from "./translators/translate.small.number"
import { getTranslatedNumberWithClassWord } from "./translators/translate.number.triplet"
import { removeLastNSymbols } from "./utils/remove-last-n-symbols"
import { lastTwoChars } from "./utils/two-last-digits"
import { NonIntegersPostfixes } from "./constants/word.postfixes.const"
import { OUTPUT_TYPE_ERROR, OUTPUT_TYPE_VALID } from "./constants/output.types"
import { findError } from "./validation/is-valid-number"
import { prepareNumber } from "./utils/prepare-number"
import { NOT_A_NUMBER } from "./validation/errors"

const output = (message: string, type: string) => ({ message, type })

function translateNumberSource(number: string): string {
  if (Number(number) < 0) {
    return `минус ${translateNumberSource(number.toString().slice(1))}`
  }

  number = prepareNumber(number)

  if (number.includes(".")) {
    const [integerPart, nonIntegerPart] = number.split(".")
    const integerPartTranslation = translateNumberSource(integerPart)
    const translatedNonIntegerPart = translateNonIntegerPart(nonIntegerPart)
    const integerPartEndsWithOne =
      integerPartTranslation.substring(integerPartTranslation.length - 4) === "один"
    if (translatedNonIntegerPart === "") {
      return integerPartTranslation
    }
    if (integerPartEndsWithOne) {
      return `${integerPartTranslation.substring(0, integerPartTranslation.length - 2) + "на"} целая ${translatedNonIntegerPart}`
    }
    return `${integerPartTranslation} целых ${translatedNonIntegerPart}`
  }

  if (Number(number) < 1000) {
    return translateThreeOrLessDigitNumber(number)
  }

  const translatedParts = []
  for (let classIndex = 0; ; classIndex++, number = removeLastNSymbols(number, 3)) {
    if (number.length < 4) {
      const wordFromNumber = getTranslatedNumberWithClassWord(number, classIndex)
      if (wordFromNumber) {
        translatedParts.unshift(wordFromNumber)
      }
      break
    }
    const triplet = number.slice(number.length - 3, number.length)
    const wordFromTriplet = getTranslatedNumberWithClassWord(triplet, classIndex)
    if (classIndex === 0 && wordFromTriplet === "ноль") {
      continue
    }
    if (wordFromTriplet) {
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
function translateNonIntegerPart(number: string): string {
  if (Number(number) === 0) {
    return ""
  }

  for (let i = number.length - 1; number[i] === "0"; i--)
    if (number[i - 1] !== "0") number = number.substring(0, i)

  const translated = translateNumberSource(number)
  const lastTwoDigits = lastTwoChars(number)
  const lastDigit = lastTwoDigits[1] || lastTwoDigits[0]
  const nonIntegerPartType =
    lastDigit === "1" && lastTwoDigits !== "11"
      ? NonIntegersPostfixes.ENDS_WITH_ONE
      : NonIntegersPostfixes.OTHERWISE

  return (
    (nonIntegerPartType === NonIntegersPostfixes.ENDS_WITH_ONE
      ? removeLastNSymbols(translated, 4) + "одна"
      : translated) +
    ` ${getCategoryWordForNonIntegerPart(number.length)}` +
    nonIntegerPartType
  )
}

export function translateNumber(input: any) {
  if (!["string", "number"].includes(typeof input)) {
    return output(NOT_A_NUMBER, OUTPUT_TYPE_ERROR)
  }
  const error = findError(input)
  return error
    ? output(String(error), OUTPUT_TYPE_ERROR)
    : output(translateNumberSource(input.toString()), OUTPUT_TYPE_VALID)
}
