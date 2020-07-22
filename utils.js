function twoLastDigits(number) {
  return number.toString().split("").slice(number.length - 2).join("")
}

module.exports = {
  twoLastDigits
}