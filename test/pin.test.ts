import { describe, expect, it } from "vitest";
import { generatePin } from "../src/pswd/pin";

describe("generatePin", () => {
  it("should generate a 6-digit PIN by default", () => {
    const pin = generatePin();
    expect(pin).toHaveLength(6);
  });

  it("should generate a PIN of the specified length", () => {
    const pin = generatePin({ pinLength: 8 });
    expect(pin).toHaveLength(8);
  });

  it("should contain only digits", () => {
    const pin = generatePin({ pinLength: 10 });
    expect(/^\d+$/.test(pin)).toBe(true);
  });

  it("should generate different PINs", () => {
    const pins = new Set([generatePin(), generatePin(), generatePin()]);
    expect(pins.size).toBeGreaterThan(1);
  });
});
