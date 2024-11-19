export const emailValidationPattern = /\S+@\S+\.\S+/

export const stringToSlug = (input: string): string => {
  // Remove non-alphanumeric characters and replace spaces with a single hyphen
  return input
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s]/g, '') // Remove non-alphanumeric characters
    .trim() // Remove leading and trailing whitespace
    .replace(/\s+/g, '-') // Replace spaces with a single hyphen
}
