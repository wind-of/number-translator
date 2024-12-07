"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.inRange = inRange
function inRange(number, [start, end]) {
  number = Number(number)
  return start <= number && end >= number
}
