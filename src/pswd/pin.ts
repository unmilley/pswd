import { getSecureRandomInt } from "../utils/crypto";

import { NUMBERS } from "../constants";
import type { PinOptions } from "../types";

/**
 * Generates a cryptographically secure numeric PIN.
 *
 * The PIN consists exclusively of decimal digits (`0–9`) selected
 * using a cryptographically secure random number generator.
 *
 * @param options - PIN generation options.
 * @param options.pinLength - Desired number of digits in the generated
 * PIN. Defaults to `6`.
 *
 * @returns A randomly generated numeric PIN containing exactly
 * `pinLength` digits.
 *
 * @remarks
 * This function relies on {@link getSecureRandomInt} instead of
 * `Math.random()`, making it suitable for generating authentication
 * codes, verification codes and other security-sensitive numeric values.
 *
 * Each digit is generated independently with uniform probability from
 * the decimal digit set (`0–9`).
 *
 * The generation algorithm performs the following steps:
 *
 * 1. Determines the requested PIN length.
 * 2. Generates a secure random index for each digit.
 * 3. Retrieves the corresponding digit from the predefined numeric set.
 * 4. Concatenates all generated digits into the resulting PIN.
 *
 * The generated PIN:
 *
 * - may contain repeated digits;
 * - may begin with `0`;
 * - contains only ASCII decimal digits.
 *
 * @example
 * Generate a default six-digit PIN.
 *
 * ```ts
 * const pin = generatePin();
 * // "483921"
 * ```
 *
 * @example
 * Generate an eight-digit PIN.
 *
 * ```ts
 * const pin = generatePin({
 *   pinLength: 8,
 * });
 * // "92714056"
 * ```
 *
 * @example
 * Generate a four-digit verification code.
 *
 * ```ts
 * const pin = generatePin({
 *   pinLength: 4,
 * });
 * // "1857"
 * ```
 *
 * @public
 */
export const generatePin = (options: Partial<PinOptions> = {}): string => {
  const { pinLength = 6 } = options;

  const passwordCharacters = [];

  for (let i = 0; i < pinLength; i++) {
    const randomIndex = getSecureRandomInt(NUMBERS.length);
    passwordCharacters.push(NUMBERS[randomIndex]);
  }

  return passwordCharacters.join("");
};

export type { PinOptions };
