export function truncateString(inputString, maxLength) {
  if (inputString.length <= maxLength) {
    return inputString
  } else {
    return inputString.substring(0, maxLength) + "..."
  }
}
