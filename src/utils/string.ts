/**
 * Removes all occurrences of the specified characters from a source string.
 *
 * Characters intended for removal are escaped before constructing the
 * regular expression, allowing any printable character (including regex
 * metacharacters) to be safely excluded.
 *
 * @param source - Original string containing the available character set.
 * @param toExclude - Characters that should be removed from the source.
 *
 * @returns A new string with all excluded characters removed.
 *
 * @remarks
 * This helper is used internally when constructing the final pool of
 * characters for password generation.
 *
 * The input strings are never modified; a new string instance is returned.
 *
 * If {@link toExclude} is empty, the original string is returned unchanged.
 *
 * @example
 * ```ts
 * stripCharacters("abcdef", "bd");
 * // "acef"
 * ```
 *
 * @example
 * ```ts
 * stripCharacters("!@#$%", "@%");
 * // "!#$"
 * ```
 *
 * @internal
 */
export const stripCharacters = (source: string, toExclude: string) => {
  if (!toExclude) return source;

  const escaped = toExclude.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  const regex = new RegExp(`[${escaped}]`, "g");

  return source.replace(regex, "");
};

export const capitalizeString = (str: string): string => {
  return str.substring(0, 1).toUpperCase() + str.slice(1).toLowerCase();
};
