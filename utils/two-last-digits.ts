export function lastTwoChars(string: string): string {
  return string
    .split("")
    .slice(string.length - 2)
    .join("")
}
