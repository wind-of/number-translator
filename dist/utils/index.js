"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.isNumberInRange = isNumberInRange
exports.isNumberInSafeBound = isNumberInSafeBound
exports.formatNumberBeforeTranslation = formatNumberBeforeTranslation
exports.removeLastNSymbols = removeLastNSymbols
exports.getLastTwoChars = getLastTwoChars
function isNumberInRange(number, [start, end]) {
  number = Number(number)
  return start <= number && end >= number
}
function isNumberInSafeBound(number) {
  return (
    typeof number === "string" ||
    (number <= Number.MAX_SAFE_INTEGER && number >= Number.MIN_SAFE_INTEGER)
  )
}
function formatNumberBeforeTranslation(number) {
  if (number.includes(".")) {
    const [integer, nonInteger] = number.split(".")
    return `${formatNumberBeforeTranslation(integer)}.${nonInteger}`
  }
  if (Number(number) === 0) {
    return "0"
  }
  for (let i = 0; i < number.length && number[0] === "0"; i++)
    if (number[i] !== "0") number = number.slice(i)
  return number
}
function removeLastNSymbols(string, amount) {
  return string.slice(0, string.length - amount)
}
function getLastTwoChars(string) {
  return string
    .split("")
    .slice(string.length - 2)
    .join("")
}
