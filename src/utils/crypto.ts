/**
 * Returns the active Web Crypto implementation.
 *
 * The function retrieves the cryptographically secure random number
 * generator exposed through the global `crypto` object.
 *
 * @returns The active {@link Crypto} implementation.
 *
 * @throws {Error}
 * Thrown when the Web Crypto API is unavailable in the current
 * JavaScript runtime.
 *
 * @remarks
 * This helper centralizes access to the cryptographic API, allowing the
 * rest of the library to rely on a single validation point.
 *
 * Supported environments include:
 *
 * - Modern web browsers
 * - Node.js 18 or newer
 * - Other JavaScript runtimes exposing `globalThis.crypto`
 *
 * @example
 * ```ts
 * const crypto = getCrypto();
 *
 * const bytes = new Uint8Array(16);
 * crypto.getRandomValues(bytes);
 * ```
 *
 * @internal
 */
const getCrypto = (): Crypto => {
  if (globalThis.crypto) {
    return globalThis.crypto;
  }

  throw new Error("Web Crypto API is not available. Node.js >=18 or a modern browser is required.");
};

/**
 * Generates a cryptographically secure random integer within the range
 * `[0, max)`.
 *
 * @param max - Exclusive upper bound.
 *
 * @returns A uniformly distributed integer greater than or equal to `0`
 * and strictly less than `max`.
 *
 * @throws {Error}
 * Thrown if `max` is less than or equal to zero.
 *
 * @throws {Error}
 * Propagates any error thrown while accessing the Web Crypto API.
 *
 * @remarks
 * The implementation uses **rejection sampling** to eliminate modulo
 * bias that would otherwise occur when mapping uniformly distributed
 * 32-bit integers into arbitrary ranges.
 *
 * Algorithm:
 *
 * 1. Generate a random unsigned 32-bit integer.
 * 2. Compute the largest acceptable value divisible by `max`.
 * 3. Reject values outside that range.
 * 4. Return the remainder after division.
 *
 * This guarantees that every integer in the target interval has exactly
 * the same probability of being selected.
 *
 * Complexity:
 *
 * - Time: **O(1)** on average.
 * - Space: **O(1)**.
 *
 * @example
 * Select a random array index.
 *
 * ```ts
 * const index = getSecureRandomInt(items.length);
 * ```
 *
 * @example
 * Roll a six-sided die.
 *
 * ```ts
 * const dice = getSecureRandomInt(6) + 1;
 * ```
 *
 * @public
 */
export const getSecureRandomInt = (max: number): number => {
  if (max <= 0) throw new Error("Max must be positive");

  const randomBuffer = new Uint32Array(1);
  const maxUint32 = 0xffffffff;
  const limit = maxUint32 - (maxUint32 % max);

  let randomNumber: number;

  do {
    getCrypto().getRandomValues(randomBuffer);
    randomNumber = randomBuffer[0];
  } while (randomNumber >= limit);

  return randomNumber % max;
};

/**
 * Generates a cryptographically secure random integer within the
 * inclusive range `[min, max]`.
 *
 * @param min - Inclusive lower bound.
 * @param max - Inclusive upper bound.
 *
 * @returns A uniformly distributed integer within the specified range.
 *
 * @throws {Error}
 * Thrown when `min` is greater than or equal to `max`.
 *
 * @throws {Error}
 * Propagates any exception thrown by the Web Crypto API.
 *
 * @remarks
 * Like {@link getSecureRandomInt}, this implementation avoids modulo
 * bias by applying rejection sampling before reducing the generated
 * value into the requested interval.
 *
 * The generated value satisfies:
 *
 * ```text
 * min ≤ result ≤ max
 * ```
 *
 * Every integer in the interval has equal probability.
 *
 * Complexity:
 *
 * - Time: **O(1)** on average.
 * - Space: **O(1)**.
 *
 * @example
 * Generate a random age.
 *
 * ```ts
 * const age = getSecureRandomIntInRange(18, 65);
 * ```
 *
 * @example
 * Generate a random verification code.
 *
 * ```ts
 * const code = getSecureRandomIntInRange(100000, 999999);
 * ```
 *
 * @example
 * Random month.
 *
 * ```ts
 * const month = getSecureRandomIntInRange(1, 12);
 * ```
 *
 * @public
 */
export const getSecureRandomIntInRange = (min: number, max: number): number => {
  if (min >= max) throw new Error("Min must be less than Max");

  const range = max - min;
  const randomBuffer = new Uint32Array(1);
  const maxUint32 = 0xffffffff;
  const limit = maxUint32 - (maxUint32 % (range + 1));

  let randomNumber: number;

  do {
    getCrypto().getRandomValues(randomBuffer);
    randomNumber = randomBuffer[0];
  } while (randomNumber >= limit);

  return min + (randomNumber % (range + 1));
};
