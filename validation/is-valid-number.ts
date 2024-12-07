import {
  NOT_A_NUMBER,
  NOT_SAFE_NUMBER,
  NON_NUMERIC_SYMBOLS,
  EXTRA_SYMBOLS,
  TOO_BIG_NUMBER,
} from "./errors"
import { isSafeNumber } from "../utils/is-safe-number"

export function findError(number: string | number) {
  const predicates = [
    {
      isInvalid: (number: string | number) => isNaN(parseFloat(number.toString())),
      message: NOT_A_NUMBER,
    },
    { isInvalid: (number: string | number) => !isSafeNumber(number), message: NOT_SAFE_NUMBER },
    {
      isInvalid: (number: string | number) => /[^0-9.\-]/.test(number.toString()),
      message: NON_NUMERIC_SYMBOLS,
    },
    {
      isInvalid: (number: string | number, chars = number.toString()) =>
        chars.indexOf(".") !== chars.lastIndexOf(".") ||
        !{ "0": true, "-1": true }[chars.lastIndexOf("-")],
      message: EXTRA_SYMBOLS,
    },
    {
      isInvalid: (number: string | number) => {
        number = number.toString()
        number = Number(number) < 0 ? number.substring(1) : number
        if (number.indexOf(".") !== -1) {
          const [int, nonInt] = number.split(".")
          return int.length > 306 || nonInt.length > 305
        }
        return number.length > 306
      },
      message: TOO_BIG_NUMBER,
    },
  ]

  return predicates.find(({ isInvalid }) => isInvalid(number))?.message
}
