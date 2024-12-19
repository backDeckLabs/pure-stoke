/**
 * Truncate a string to a maximum length, optionally adding an ellipsis at the end
 */
export const truncateString = (
  input: string,
  maxLength: number,
  addEllipsis: boolean = true
): string => {
  if (input.length <= maxLength) {
    return input // Return the input as is if it doesn't exceed the maxLength
  }

  // Find the maximum length excluding the ellipsis, if applicable
  const maxAllowedLength = addEllipsis ? maxLength - 3 : maxLength

  // Truncate to the maxAllowedLength and find the last space to avoid breaking words
  const truncated = input.slice(0, maxAllowedLength)
  const lastSpaceIndex = truncated.lastIndexOf(' ')

  // If there's a space within the truncated string, cut off at the last space
  const result =
    lastSpaceIndex > -1 ? truncated.slice(0, lastSpaceIndex) : truncated

  // Add ellipsis if the string was truncated and ellipsis is desired
  return addEllipsis ? result + '...' : result
}
