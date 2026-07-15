import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getSecureRandomInt, getSecureRandomIntInRange } from "../src/utils/crypto";

describe("getSecureRandomInt", () => {
  it("should throw an error if max <= 0", () => {
    expect(() => getSecureRandomInt(0)).toThrow("Max must be positive");
    expect(() => getSecureRandomInt(-5)).toThrow("Max must be positive");
  });

  it("should return a number in the range [0, max)", () => {
    for (let i = 0; i < 100; i++) {
      const result = getSecureRandomInt(10);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(10);
    }
  });

  it("should return a number within the range for max = 1", () => {
    const result = getSecureRandomInt(1);
    expect(result).toBe(0);
  });

  it("should return a number within the range for a large max", () => {
    for (let i = 0; i < 50; i++) {
      const result = getSecureRandomInt(1000000);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(1000000);
    }
  });

  it("should generate different numbers (not always the same one)", () => {
    const results = new Set();
    for (let i = 0; i < 100; i++) {
      results.add(getSecureRandomInt(100));
    }
    // If more than one unique value is obtained, the function works
    expect(results.size).toBeGreaterThan(1);
  });

  it("should distribute values relatively evenly", () => {
    const max = 10;
    const distribution: any[] = Array.from({ length: max }).fill(0);
    const iterations = 10000;

    for (let i = 0; i < iterations; i++) {
      const num = getSecureRandomInt(max);
      distribution[num]++;
    }

    // Each value should occur approximately 1000 times (±50%)
    distribution.forEach((count) => {
      expect(count).toBeGreaterThan((iterations / max) * 0.5);
      expect(count).toBeLessThan((iterations / max) * 1.5);
    });
  });
});

describe("getSecureRandomIntInRange", () => {
  it("should throw an error if min >= max", () => {
    expect(() => getSecureRandomIntInRange(10, 5)).toThrow("Min must be less than Max");
    expect(() => getSecureRandomIntInRange(5, 5)).toThrow("Min must be less than Max");
  });

  it("should return a number in the range [min, max]", () => {
    for (let i = 0; i < 100; i++) {
      const result = getSecureRandomIntInRange(10, 20);
      expect(result).toBeGreaterThanOrEqual(10);
      expect(result).toBeLessThanOrEqual(20);
    }
  });

  it("should return a number within the range for min = max - 1", () => {
    const results = new Set();
    for (let i = 0; i < 50; i++) {
      results.add(getSecureRandomIntInRange(5, 6));
    }
    expect(results.has(5) || results.has(6)).toBe(true);
  });

  it("should return a number within the specified range for negative numbers", () => {
    for (let i = 0; i < 100; i++) {
      const result = getSecureRandomIntInRange(-10, 10);
      expect(result).toBeGreaterThanOrEqual(-10);
      expect(result).toBeLessThanOrEqual(10);
    }
  });

  it("should generate distinct numbers within the range", () => {
    const results = new Set();
    for (let i = 0; i < 100; i++) {
      results.add(getSecureRandomIntInRange(1, 100));
    }
    expect(results.size).toBeGreaterThan(1);
  });

  it("should distribute values relatively evenly within the range", () => {
    const min = 100;
    const max = 110;
    const range = max - min + 1;
    const distribution: any[] = Array.from({ length: range }).fill(0);
    const iterations = 10000;

    for (let i = 0; i < iterations; i++) {
      const num = getSecureRandomIntInRange(min, max);
      distribution[num - min]++;
    }

    // Each value should occur approximately iterations/range times
    distribution.forEach((count) => {
      expect(count).toBeGreaterThan((iterations / range) * 0.5);
      expect(count).toBeLessThan((iterations / range) * 1.5);
    });
  });

  it("should work with large ranges", () => {
    for (let i = 0; i < 50; i++) {
      const result = getSecureRandomIntInRange(1000000, 2000000);
      expect(result).toBeGreaterThanOrEqual(1000000);
      expect(result).toBeLessThanOrEqual(2000000);
    }
  });
});

describe("getCrypto", () => {
  let originalCrypto: Crypto | undefined;

  beforeEach(() => {
    originalCrypto = globalThis.crypto;
  });

  afterEach(() => {
    if (originalCrypto) {
      Object.defineProperty(globalThis, "crypto", {
        value: originalCrypto,
        writable: true,
        configurable: true,
      });
    } else {
      Object.defineProperty(globalThis, "crypto", {
        value: undefined,
        writable: true,
        configurable: true,
      });
    }
  });

  it("should return globalThis.crypto when available", () => {
    const result = getSecureRandomInt(10);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(10);
  });

  it("should throw error when crypto is not available", () => {
    Object.defineProperty(globalThis, "crypto", {
      value: undefined,
      writable: true,
      configurable: true,
    });

    expect(() => getSecureRandomInt(10)).toThrow(
      "Web Crypto API is not available. Node.js >=18 or a modern browser is required.",
    );
  });

  it("should throw error when crypto is null", () => {
    Object.defineProperty(globalThis, "crypto", {
      value: null,
      writable: true,
      configurable: true,
    });

    expect(() => getSecureRandomInt(10)).toThrow(
      "Web Crypto API is not available. Node.js >=18 or a modern browser is required.",
    );
  });

  it("should work with getSecureRandomIntInRange when crypto is available", () => {
    const result = getSecureRandomIntInRange(5, 15);
    expect(result).toBeGreaterThanOrEqual(5);
    expect(result).toBeLessThanOrEqual(15);
  });

  it("should throw error in getSecureRandomIntInRange when crypto is not available", () => {
    Object.defineProperty(globalThis, "crypto", {
      value: undefined,
      writable: true,
      configurable: true,
    });

    expect(() => getSecureRandomIntInRange(5, 15)).toThrow(
      "Web Crypto API is not available. Node.js >=18 or a modern browser is required.",
    );
  });
});
