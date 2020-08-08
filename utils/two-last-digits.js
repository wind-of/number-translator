module.exports = {
  lastTwoChars(string) {
    return string.split("").slice(string.length - 2).join("")
  }
}
