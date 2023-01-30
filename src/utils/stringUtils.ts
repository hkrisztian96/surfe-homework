/**
 * Capitalizes the first letter of the given string.
 * @param s the string to customize.
 * @returns the first letter capitalized string.
 */
export const capitalizeFirstLetter = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
