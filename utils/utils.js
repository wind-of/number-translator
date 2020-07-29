function twoLastDigits(number) {
  return number.toString().split("").slice(number.length - 2).join("")
}

function removeLastNSymbols(string, amount) {
  return string.slice(0, string.length - amount)
}

function numberIsNotSafe(number) {
  return typeof number !== "string" && 
        (
          number > Number.MAX_SAFE_INTEGER || 
          number < Number.MIN_SAFE_INTEGER
        )
}

module.exports = {
  twoLastDigits,
  removeLastNSymbols,
  numberIsNotSafe
}