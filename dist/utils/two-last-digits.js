"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.lastTwoChars = lastTwoChars
function lastTwoChars(string) {
  return string
    .split("")
    .slice(string.length - 2)
    .join("")
}
