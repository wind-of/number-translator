export function removeLastNSymbols(string: string, amount: number): string {
  return string.slice(0, string.length - amount)
}
