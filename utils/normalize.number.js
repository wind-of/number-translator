function normalizeNumber(stringNumber) {
  if(stringNumber.includes(".")) {
    const [integer, nonInteger] = stringNumber.split(".");
    return `${normalizeNumber(integer)}.${nonInteger}`
  }
  if(Number(stringNumber) === 0) {
    return "0"
  }
  while(stringNumber[0] === "0") {
    stringNumber = stringNumber.slice(1)
  }
  return stringNumber
}

module.exports = {
  normalizeNumber
}
