import { DIGITS, DOZENS, HUNDREDS } from "../constants/word.forms"

export const getDigit = (number: number | string) => DIGITS[Number(number)]
export const getDozens = (number: number | string) => DOZENS[Number(number) - 2]
export const getHundreds = (number: number | string) => HUNDREDS[Number(number) - 1]
