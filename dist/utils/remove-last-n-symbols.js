"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.removeLastNSymbols = removeLastNSymbols
function removeLastNSymbols(string, amount) {
  return string.slice(0, string.length - amount)
}
