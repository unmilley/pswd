import words from "../../data/word-list-(lite).json";
import type { MemorableOptions } from "../../types";
import { generateMemorableWithDefaultWordList } from "./base";

/**
 * Generates a cryptographically secure memorable password using the
 * library's built-in word list.
 *
 * This function serves as the primary public API for memorable password
 * generation. It delegates the generation process to
 * {@link generateMemorableWithDefaultWordList}, automatically supplying
 * the bundled dictionary of words.
 *
 * @param options - Memorable password generation options.
 * @param options.capitalize - Capitalizes the first letter of every word.
 * Defaults to `false`.
 * @param options.randomCapitalization - Randomizes the case of each
 * character in every generated word.
 * Defaults to `false`.
 * @param options.randomNumberBeginning - Prepends a random three-digit
 * number to the generated password.
 * Defaults to `false`.
 * @param options.randomNumberEnd - Appends a random three-digit number to
 * the generated password.
 * Defaults to `false`.
 * @param options.separator - Separator inserted between generated words.
 * Defaults to `"space"`.
 * @param options.wordCount - Number of randomly selected words.
 * Defaults to `6`.
 * @param options.wordList - Optional custom dictionary. When provided,
 * it overrides the built-in word list.
 *
 * @returns A cryptographically secure memorable password composed of
 * randomly selected words.
 *
 * @remarks
 * The bundled dictionary provides a convenient default source of words,
 * allowing consumers to generate memorable passwords without managing
 * their own word lists.
 *
 * Generation is delegated to
 * {@link generateMemorableWithDefaultWordList}, meaning both functions
 * produce identical results when supplied with the same dictionary and
 * configuration.
 *
 * The generation process consists of:
 *
 * 1. Selecting random words from the dictionary.
 * 2. Applying optional capitalization.
 * 3. Applying optional random character casing.
 * 4. Optionally adding random numeric prefixes and suffixes.
 * 5. Joining all parts using the configured separator.
 *
 * Random word selection and numeric values are generated using
 * cryptographically secure random number generation.
 *
 * @throws {TypeError}
 * Propagates any exception thrown by the underlying cryptographic random
 * number generator.
 *
 * @throws {RangeError}
 * May propagate an exception if an empty custom word list is supplied.
 *
 * @example
 * Generate a default memorable password.
 *
 * ```ts
 * const password = generateMemorable();
 * // "correct horse battery staple river stone"
 * ```
 *
 * @example
 * Generate a dash-separated password.
 *
 * ```ts
 * const password = generateMemorable({
 *   separator: "dash",
 * });
 * // "correct-horse-battery-staple"
 * ```
 *
 * @example
 * Generate a password with title-cased words.
 *
 * ```ts
 * const password = generateMemorable({
 *   capitalize: true,
 * });
 * // "Correct Horse Battery Staple"
 * ```
 *
 * @example
 * Add random numeric values.
 *
 * ```ts
 * const password = generateMemorable({
 *   randomNumberBeginning: true,
 *   randomNumberEnd: true,
 * });
 * // "412 correct horse battery staple 853"
 * ```
 *
 * @example
 * Override the built-in dictionary.
 *
 * ```ts
 * const password = generateMemorable({
 *   wordList: ["apple", "river", "planet"],
 *   wordCount: 3,
 * });
 * ```
 *
 * @public
 */
export const generateMemorable = (options: Partial<MemorableOptions> = {}): string => {
  return generateMemorableWithDefaultWordList(words, options);
};

export type { MemorableOptions };
