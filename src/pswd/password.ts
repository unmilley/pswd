import { LOWERCASE, NUMBERS, SIMILAR_CHARACTERS, SYMBOLS, UPPERCASE } from "../constants";
import type { PasswordOptions } from "../types";
import { getSecureRandomInt } from "../utils/crypto";
import { stripCharacters } from "../utils/string";

/**
 * Generates a cryptographically secure random password.
 *
 * The function constructs a character pool according to the supplied
 * options, removes any excluded characters and then selects random
 * characters using a cryptographically secure random number generator.
 *
 * @param options - Password generation options.
 * @param options.length - Desired password length.
 * Defaults to `16`.
 * @param options.includeUpper - Includes uppercase Latin letters.
 * Defaults to `true`.
 * @param options.includeLower - Includes lowercase Latin letters.
 * Defaults to `true`.
 * @param options.includeNumbers - Includes decimal digits.
 * Defaults to `true`.
 * @param options.includeSymbols - Includes predefined special symbols.
 * Defaults to `false`.
 * @param options.excludeSimilar - Removes visually ambiguous characters
 * such as `I`, `l`, `1`, `O` and `0`.
 * Defaults to `false`.
 * @param options.customSymbols - Additional custom characters appended
 * to the available character pool.
 * @param options.excludeSymbols - Characters that should be removed from
 * the final character pool after it has been assembled.
 *
 * @returns A cryptographically secure random password.
 *
 * Returns an empty string if the resulting character pool becomes empty
 * after applying all inclusion and exclusion rules.
 *
 * @remarks
 * This implementation relies on {@link getSecureRandomInt} rather than
 * `Math.random()`, making it suitable for generating passwords and other
 * security-sensitive secrets.
 *
 * Password characters are selected independently with uniform probability
 * from the resulting character set.
 *
 * The algorithm performs the following steps:
 *
 * 1. Builds the available character pool.
 * 2. Appends custom symbols if provided.
 * 3. Removes visually similar and explicitly excluded characters.
 * 4. Randomly selects characters until the requested length is reached.
 *
 * Unlike some password generators, this implementation **does not**
 * guarantee that every enabled character category will appear in the
 * generated password. Every character is sampled independently from the
 * final pool.
 *
 * @throws {TypeError}
 * Propagates any exception thrown by the underlying cryptographic random
 * number generator.
 *
 * @example
 * Generate a default password.
 *
 * ```ts
 * const password = generatePassword();
 * // "y4Pfms92kQAbLzHt"
 * ```
 *
 * @example
 * Generate a strong password with symbols.
 *
 * ```ts
 * const password = generatePassword({
 *   length: 24,
 *   includeSymbols: true,
 * }); // Y9-VEqS1-lzh+]1x;.u;P,SE
 * ```
 *
 * @example
 * Exclude visually similar characters.
 *
 * ```ts
 * const password = generatePassword({
 *   excludeSimilar: true,
 * }); // bVjVqzBHUtLyYP2N without `Il1O0`
 * ```
 *
 * @example
 * Add custom symbols.
 *
 * ```ts
 * const password = generatePassword({
 *   includeSymbols: true,
 *   customSymbols: "€£¥",
 * }); // rh)@jI¥¥4FGe]QQH
 * ```
 *
 * @example
 * Remove specific characters.
 *
 * ```ts
 * const password = generatePassword({
 *   excludeSymbols: "aeiouAEIOU",
 * }); // dk1vtxMZSFdxGzhK
 * ```
 *
 * @public
 */
export const generatePassword = (options: Partial<PasswordOptions> = {}): string => {
  const {
    length = 16,
    includeUpper = true,
    includeLower = true,
    includeNumbers = true,
    includeSymbols = false,
    excludeSimilar = false,
    customSymbols = "",
    excludeSymbols = "",
  } = options;

  let characterSet = "";

  if (includeUpper) characterSet += UPPERCASE;
  if (includeLower) characterSet += LOWERCASE;
  if (includeNumbers) characterSet += NUMBERS;
  if (includeSymbols) characterSet += SYMBOLS;

  if (customSymbols) {
    characterSet += customSymbols;
  }

  let toExclude = "";

  if (excludeSimilar) {
    toExclude += SIMILAR_CHARACTERS;
  }

  if (excludeSymbols) {
    toExclude += excludeSymbols;
  }

  characterSet = stripCharacters(characterSet, toExclude);

  if (characterSet.length === 0) {
    return "";
  }

  const passwordCharacters = [];
  const charsetLength = characterSet.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = getSecureRandomInt(charsetLength);
    passwordCharacters.push(characterSet[randomIndex]);
  }

  return passwordCharacters.join("");
};

export type { PasswordOptions };
