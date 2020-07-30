const { digits, dozens, hundreds } = require("./word.forms");

module.exports = {
  getDigit: number => digits[number],
  getDozens: number => dozens[number - 2],
  getHundreds: number => hundreds[number - 1]
}
