export function isSafeNumber(number: string | number): boolean {
  return (
    typeof number === "string" ||
    (number <= Number.MAX_SAFE_INTEGER && number >= Number.MIN_SAFE_INTEGER)
  )
}
