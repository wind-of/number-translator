function inRange(number, [start, end]) {
  return start <= number && end >= number
}

module.exports = {
  inRange
}