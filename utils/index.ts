export function isNumberInRange(number: string | number, [start, end]: [number, number]): boolean {
  number = Number(number)
  return start <= number && end >= number
}

export function isNumberInSafeBound(number: string | number): boolean {
  return (
    typeof number === "string" ||
    (number <= Number.MAX_SAFE_INTEGER && number >= Number.MIN_SAFE_INTEGER)
  )
}

export function formatNumberBeforeTranslation(number: string): string {
  if (number.includes(".")) {
    const [integer, nonInteger] = number.split(".")
    return `${formatNumberBeforeTranslation(integer)}.${nonInteger}`
  }
  if (Number(number) === 0) {
    return "0"
  }
  for (let i = 0; i < number.length && number[0] === "0"; i++)
    if (number[i] !== "0") number = number.slice(i)
  return number
}

export function removeLastNSymbols(string: string, amount: number): string {
  return string.slice(0, string.length - amount)
}

export function getLastTwoChars(string: string): string {
  return string
    .split("")
    .slice(string.length - 2)
    .join("")
}
