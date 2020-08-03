module.exports = {
  twoLastDigits(number) {
    return number.toString().split("").slice(number.length - 2).join("")
  }
}
