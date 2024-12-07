export function inRange(number: string | number, [start, end]: [number, number]) {
  number = Number(number)
  return start <= number && end >= number
}
