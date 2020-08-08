function prepareNumber(number) {
  number = number.toString();
  if(number.includes(".")) {
    const [integer, nonInteger] = number.split(".");
    return `${prepareNumber(integer)}.${nonInteger}`
  }
  if(Number(number) === 0) {
    return "0"
  }
  while(number[0] === "0") {
    number = number.slice(1)
  }
  return number
}

module.exports = {
  prepareNumber
}
