"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.isSafeNumber = isSafeNumber
function isSafeNumber(number) {
  return (
    typeof number === "string" ||
    (number <= Number.MAX_SAFE_INTEGER && number >= Number.MIN_SAFE_INTEGER)
  )
}
