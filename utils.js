function twoLastDigits(number) {
  return number.toString().split("").slice(number.length - 2).join("")
}

function removeLastNSymbols(string, amount) {
  return string.slice(0, string.length - amount)
}

module.exports = {
  twoLastDigits,
  removeLastNSymbols
}