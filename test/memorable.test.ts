import { describe, expect, it } from "vitest";
import { generateMemorable } from "../src/pswd/memorable/index";
import { generateMemorableLite } from "../src/pswd/memorable/lite";

describe("generateMemorable", () => {
  it("should generate a password consisting of 6 words by default", () => {
    const password = generateMemorable();
    const words = password.split(" ");
    expect(words).toHaveLength(6);
  });

  it("should generate a password with the specified number of words", () => {
    const password = generateMemorable({ wordCount: 4 });
    const words = password.split(" ");
    expect(words).toHaveLength(4);
  });

  it("should capitalize words", () => {
    const password = generateMemorable({ capitalize: true });
    const words = password.split(" ");
    words.forEach((word) => {
      expect(/^[A-Z]/.test(word)).toBe(true);
    });
  });

  it("should use random capitalization", () => {
    const password = generateMemorable({
      randomCapitalization: true,
      wordCount: 10,
    });
    // Check that there are both uppercase and lowercase letters
    expect(/[A-Z]/.test(password)).toBe(true);
    expect(/[a-z]/.test(password)).toBe(true);
  });

  it("should add a number at the beginning", () => {
    const password = generateMemorable({
      randomNumberBeginning: true,
      wordCount: 1,
    });
    expect(/^\d{3}/.test(password)).toBe(true);
  });

  it("should add a number at the end", () => {
    const password = generateMemorable({
      randomNumberEnd: true,
      wordCount: 1,
    });
    expect(/\d{3}$/.test(password)).toBe(true);
  });

  it("should add numbers to the beginning and end", () => {
    const password = generateMemorable({
      randomNumberBeginning: true,
      randomNumberEnd: true,
      wordCount: 1,
    });
    expect(/^\d{3}.*\d{3}$/.test(password)).toBe(true);
  });

  it("should use a space as the default separator", () => {
    const password = generateMemorable({
      separator: "space",
      wordCount: 3,
    });
    const words = password.split(" ");
    expect(words.length).toBeGreaterThan(1);
  });

  it("should use a dash as the separator", () => {
    const password = generateMemorable({
      separator: "dash",
      wordCount: 3,
    });
    expect(password.includes("-")).toBe(true);
    expect(password.split("-")).toHaveLength(3);
  });

  it("should use an empty string as a separator", () => {
    const password = generateMemorable({
      separator: "none",
      wordCount: 3,
    });
    expect(password.includes(" ")).toBe(false);
    expect(password.includes("-")).toBe(false);
  });

  it("should use symbols as separators", () => {
    const password = generateMemorable({
      separator: "symbol",
      wordCount: 3,
    });
    expect(/[!@#$%^&*()_+\-=[\]{};':"|,.<>/?]/.test(password)).toBe(true);
  });

  it("should use a custom word list", () => {
    const customWordList = ["test", "password", "secure"];
    const password = generateMemorableLite(customWordList, {
      wordCount: 3,
      capitalize: false,
    });
    const words = password.split(" ");
    words.forEach((word) => {
      expect(customWordList).toContain(word);
    });
  });

  it("should generate different passwords", () => {
    const passwords = new Set([generateMemorable(), generateMemorable(), generateMemorable()]);
    expect(passwords.size).toBeGreaterThan(1);
  });

  it("should work with all options combined", () => {
    const password = generateMemorable({
      capitalize: true,
      randomNumberBeginning: true,
      randomNumberEnd: true,
      separator: "dash",
      wordCount: 3,
    });
    expect(/^\d{3}/.test(password)).toBe(true);
    expect(/\d{3}$/.test(password)).toBe(true);
    expect(password.includes("-")).toBe(true);
  });
});
