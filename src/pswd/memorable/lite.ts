import type { MemorableOptions } from "../../types";
import { generateMemorableWithDefaultWordList } from "./base";

/**
 * Generates a cryptographically secure memorable password using a
 * user-provided dictionary.
 *
 * Unlike the standard memorable password generators, this function does
 * not rely on a bundled word list. Instead, the caller supplies the
 * dictionary at runtime, allowing complete control over the vocabulary
 * used during password generation.
 *
 * @param wordList - Collection of candidate words used during password
 * generation. Every generated word is selected uniformly at random from
 * this list.
 *
 * @param options - Memorable password generation options.
 * @param options.capitalize - Capitalizes the first character of every
 * generated word. Defaults to `false`.
 * @param options.randomCapitalization - Randomizes the case of every
 * character after optional capitalization. Defaults to `false`.
 * @param options.randomNumberBeginning - Prepends a random three-digit
 * number. Defaults to `false`.
 * @param options.randomNumberEnd - Appends a random three-digit number.
 * Defaults to `false`.
 * @param options.separator - Separator inserted between generated words.
 * Defaults to `"space"`.
 * @param options.wordCount - Number of randomly selected words.
 * Defaults to `6`.
 *
 * @returns A cryptographically secure memorable password assembled from
 * randomly selected words.
 *
 * @remarks
 * This function is intended for applications that maintain their own
 * dictionaries or wish to generate passwords in a specific language,
 * domain or vocabulary.
 *
 * Compared with generators that bundle a dictionary, this function:
 *
 * - accepts any runtime-provided word list;
 * - reduces package size by avoiding embedded dictionaries;
 * - produces entropy proportional to the supplied dictionary size;
 * - shares the same generation algorithm and option handling as the
 *   other memorable password generators.
 *
 * Generation algorithm:
 *
 * 1. Selects random words from the supplied dictionary.
 * 2. Optionally capitalizes each word.
 * 3. Optionally randomizes the case of every character.
 * 4. Optionally prepends and/or appends random three-digit numbers.
 * 5. Joins all parts using the configured separator.
 *
 * Random word selection and numeric values are generated using the
 * Web Crypto API through cryptographically secure random number
 * generation.
 *
 * The same word may be selected multiple times because every selection
 * is performed independently.
 *
 * @throws {RangeError}
 * May propagate an exception if the supplied word list is empty and a
 * secure random index cannot be generated.
 *
 * @throws {TypeError}
 * Propagates any exception thrown by the underlying cryptographic random
 * number generator.
 *
 * @example
 * Generate a password from a custom dictionary.
 *
 * ```ts
 * const password = generateMemorableLite([
 *   "apple",
 *   "river",
 *   "forest",
 *   "planet",
 * ]);
 * ```
 *
 * @example
 * Generate a dash-separated password.
 *
 * ```ts
 * const password = generateMemorableLite(
 *   ["red", "green", "blue", "yellow"],
 *   {
 *     separator: "dash",
 *   },
 * );
 * ```
 *
 * @example
 * Capitalize every generated word.
 *
 * ```ts
 * const password = generateMemorableLite(
 *   words,
 *   {
 *     capitalize: true,
 *   },
 * );
 * ```
 *
 * @example
 * Append a random number.
 *
 * ```ts
 * const password = generateMemorableLite(
 *   words,
 *   {
 *     randomNumberEnd: true,
 *   },
 * );
 * ```
 *
 * @example
 * Generate a four-word memorable password.
 *
 * ```ts
 * const password = generateMemorableLite(
 *   words,
 *   {
 *     wordCount: 4,
 *   },
 * );
 * ```
 *
 * @public
 */
export const generateMemorableLite = (
  wordList: string[],
  options: Partial<MemorableOptions> = {},
): string => {
  return generateMemorableWithDefaultWordList(wordList, options);
};
export type { MemorableOptions };
