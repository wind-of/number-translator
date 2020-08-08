function prepareNumber(number) {
  number = number.toString();
  if(stringNumber.includes(".")) {
    const [integer, nonInteger] = stringNumber.split(".");
    return `${prepareNumber(integer)}.${nonInteger}`
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
  prepareNumber
}
