export function prepareNumber(number: string): string {
  if (number.includes(".")) {
    const [integer, nonInteger] = number.split(".")
    return `${prepareNumber(integer)}.${nonInteger}`
  }
  if (Number(number) === 0) {
    return "0"
  }
  for (let i = 0; i < number.length && number[0] === "0"; i++)
    if (number[i] !== "0") number = number.slice(i)
  return number
}
