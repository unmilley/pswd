import { describe, expect, it } from "vitest";
import { generatePassword } from "../src/pswd/password";

describe("generatePassword", () => {
  it("should generate a password with a default length of 16", () => {
    const password = generatePassword();
    expect(password).toHaveLength(16);
  });

  it("should generate a password of the specified length", () => {
    const password = generatePassword({ length: 20 });
    expect(password).toHaveLength(20);
  });

  it("should contain uppercase letters", () => {
    const password = generatePassword({
      includeLower: false,
      includeNumbers: false,
      includeSymbols: false,
    });
    expect(/[A-Z]/.test(password)).toBe(true);
  });

  it("must contain lowercase letters", () => {
    const password = generatePassword({
      includeUpper: false,
      includeNumbers: false,
      includeSymbols: false,
    });
    expect(/[a-z]/.test(password)).toBe(true);
  });

  it("must contain digits", () => {
    const password = generatePassword({
      includeUpper: false,
      includeLower: false,
      includeSymbols: false,
    });
    expect(/\d/.test(password)).toBe(true);
  });

  it("must contain symbols", () => {
    const password = generatePassword({
      includeSymbols: true,
      includeUpper: false,
      includeLower: false,
      includeNumbers: false,
    });
    expect(/[!@#$%^&*()_+\-=[\]{};':"|,. <>/?]/.test(password)).toBe(true);
  });

  it("must exclude similar characters", () => {
    const password = generatePassword({
      excludeSimilar: true,
      length: 100,
    });
    expect(/[0OIl1]/.test(password)).toBe(false);
  });

  it("should include custom symbols", () => {
    const customSymbols = "©®™";
    const password = generatePassword({
      customSymbols,
      includeUpper: false,
      includeLower: false,
      includeNumbers: false,
    });
    expect(new RegExp(`[${customSymbols}]`).test(password)).toBe(true);
  });

  it("should exclude the specified characters", () => {
    const password = generatePassword({
      excludeSymbols: "aeiou",
      length: 100,
      includeUpper: false,
      includeNumbers: false,
      includeSymbols: false,
    });
    expect(/[aeiou]/.test(password)).toBe(false);
  });

  it("should return an empty string if there are no characters", () => {
    const password = generatePassword({
      includeUpper: false,
      includeLower: false,
      includeNumbers: false,
      includeSymbols: false,
    });
    expect(password).toBe("");
  });

  it("should handle the exclusion of similar and custom characters together", () => {
    const password = generatePassword({
      excludeSimilar: true,
      excludeSymbols: "!@#",
      length: 50,
      includeUpper: false,
      includeLower: false,
      includeNumbers: false,
      includeSymbols: true,
    });
    expect(/[!@#0OIl1]/.test(password)).toBe(false);
  });

  it("should generate different passwords", () => {
    const passwords = new Set([generatePassword(), generatePassword(), generatePassword()]);
    expect(passwords.size).toBeGreaterThan(1);
  });
});
