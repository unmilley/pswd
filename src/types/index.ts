/**
 * Defines the separator inserted between generated memorable words.
 *
 * @remarks
 * The selected separator determines how individual words are joined
 * when constructing memorable passwords.
 *
 * Available values:
 *
 * - `"space"` — separates words with a space (`"correct horse"`).
 * - `"symbol"` — uses a predefined symbol separator.
 * - `"dash"` — joins words using the `-` character.
 * - `"none"` — concatenates words without any separator.
 *
 * @example
 * ```ts
 * const separator: Separator = "dash";
 * ```
 *
 * @public
 */
export type Separator = "space" | "symbol" | "dash" | "none";

/**
 * Configuration options for secure password generation.
 *
 * @remarks
 * These options control which character groups are included in the
 * generated password as well as how the final character pool is built.
 *
 * Unless explicitly overridden, the password generator applies its own
 * default values for each option.
 *
 * @public
 */
export type PasswordOptions = {
  /**
   * Additional characters appended to the default symbol set.
   *
   * @remarks
   * This allows consumers to include organization-specific symbols
   * or characters required by external password policies.
   *
   * @defaultValue ""
   */
  customSymbols: string;

  /**
   * Excludes visually similar characters.
   *
   * @remarks
   * Characters such as `I`, `l`, `1`, `O` and `0` are removed from
   * the available character pool, improving readability when passwords
   * must be entered manually.
   *
   * @defaultValue false
   */
  excludeSimilar: boolean;

  /**
   * Characters that should be removed from the final character pool.
   *
   * @remarks
   * Exclusions are applied after all enabled character groups have been
   * assembled.
   *
   * @defaultValue ""
   */
  excludeSymbols: string;

  /**
   * Includes lowercase Latin letters (`a-z`).
   *
   * @defaultValue true
   */
  includeLower: boolean;

  /**
   * Includes decimal digits (`0-9`).
   *
   * @defaultValue true
   */
  includeNumbers: boolean;

  /**
   * Includes predefined special symbols.
   *
   * @defaultValue false
   */
  includeSymbols: boolean;

  /**
   * Includes uppercase Latin letters (`A-Z`).
   *
   * @defaultValue true
   */
  includeUpper: boolean;

  /**
   * Desired password length.
   *
   * @remarks
   * The generator produces exactly this number of characters.
   *
   * @defaultValue 16
   */
  length: number;
};

/**
 * Configuration options for memorable password generation.
 *
 * @remarks
 * Memorable passwords are composed from randomly selected dictionary
 * words and optional separators. Additional formatting options allow
 * the generated password to balance memorability and entropy.
 *
 * @public
 */
export type MemorableOptions = {
  /**
   * Capitalizes the first letter of every generated word.
   *
   * @defaultValue false
   */
  capitalize: boolean;

  /**
   * Randomly capitalizes characters within generated words.
   *
   * @remarks
   * This option increases password entropy while preserving
   * word-based memorability.
   *
   * @defaultValue false
   */
  randomCapitalization: boolean;

  /**
   * Prepends a random numeric value to the generated password.
   *
   * @defaultValue false
   */
  randomNumberBeginning: boolean;

  /**
   * Appends a random numeric value to the generated password.
   *
   * @defaultValue false
   */
  randomNumberEnd: boolean;

  /**
   * Separator inserted between generated words.
   *
   * @defaultValue "dash"
   */
  separator: Separator;

  /**
   * Number of words included in the generated password.
   *
   * @defaultValue 4
   */
  wordCount: number;
};

/**
 * Configuration options for numeric PIN generation.
 *
 * @remarks
 * These options control the length of the generated PIN.
 *
 * @public
 */
export type PinOptions = {
  /**
   * Number of digits in the generated PIN.
   *
   * @remarks
   * The generated PIN may contain repeated digits and may begin with `0`.
   *
   * @defaultValue 6
   */
  pinLength: number;
};
