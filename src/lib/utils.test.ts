import { isValidImageSrc } from "./utils";
import { describe, it, expect } from "vitest";

describe("isValidImageSrc", () => {
  it("should return false for null or undefined", () => {
    expect(isValidImageSrc(null)).toBe(false);
    expect(isValidImageSrc(undefined)).toBe(false);
  });

  it("should return false for non-string types", () => {
    expect(isValidImageSrc(123)).toBe(false);
    expect(isValidImageSrc({})).toBe(false);
    expect(isValidImageSrc([])).toBe(false);
  });

  it("should return false for empty or whitespace strings", () => {
    expect(isValidImageSrc("")).toBe(false);
    expect(isValidImageSrc("   ")).toBe(false);
  });

  it("should return true for valid image src strings", () => {
    expect(isValidImageSrc("http://example.com/image.png")).toBe(true);
    expect(isValidImageSrc("https://example.com/image.png")).toBe(true);
    expect(isValidImageSrc("/images/image.png")).toBe(true);
  });

  it("should return false for invalid image src strings", () => {
    expect(isValidImageSrc("ftp://example.com/image.png")).toBe(false);
    expect(isValidImageSrc("image.png")).toBe(false);
    expect(isValidImageSrc("www.example.com/image.png")).toBe(false);
  });

  it("should handle strings with leading/trailing whitespace", () => {
    expect(isValidImageSrc("   http://example.com/image.png   ")).toBe(true);
    expect(isValidImageSrc("   /images/image.png   ")).toBe(true);
    expect(isValidImageSrc("   image.png   ")).toBe(false);
  });

  it("should NOT be case-sensitive", () => {
    expect(isValidImageSrc("HTTP://example.com/image.png")).toBe(true);
    expect(isValidImageSrc("Https://example.com/image.png")).toBe(true);
    expect(isValidImageSrc("/Images/image.png")).toBe(true);
  });

  it("should return false for strings with only special characters", () => {
    expect(isValidImageSrc("!!!@@@###")).toBe(false);
  });

  it("should return false for strings with valid prefixes but invalid formats", () => {
    expect(isValidImageSrc("http:/example.com/image.png")).toBe(false);
    expect(isValidImageSrc("https//example.com/image.png")).toBe(false);
    expect(isValidImageSrc("//images/image.png")).toBe(false);
  });

  it("should return true for valid src with query parameters or fragments", () => {
    expect(isValidImageSrc("http://example.com/image.png?size=large")).toBe(
      true
    );
    expect(isValidImageSrc("https://example.com/image.png#section")).toBe(true);
    expect(isValidImageSrc("/images/image.png?version=1.2")).toBe(true);
  });

  it("should return false for data URIs", () => {
    expect(
      isValidImageSrc("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...")
    ).toBe(false);
  });

  it("should return false for relative paths without leading slash", () => {
    expect(isValidImageSrc("images/image.png")).toBe(false);
  });

  it("should return true for root path", () => {
    expect(isValidImageSrc("/")).toBe(true);
  });

  it("should return false for strings with only newline or tab characters", () => {
    expect(isValidImageSrc("\n")).toBe(false);
    expect(isValidImageSrc("\t")).toBe(false);
  });

  it("should return true for valid src with mixed case and extra spaces", () => {
    expect(isValidImageSrc("   HtTpS://Example.com/Image.png   ")).toBe(true);
  });

  it("should return false for strings with valid prefixes but no content", () => {
    expect(isValidImageSrc("http://")).toBe(false);
    expect(isValidImageSrc("https://")).toBe(false);
    expect(isValidImageSrc("/   ")).toBe(false);
  });

  it("should return false for very long invalid strings", () => {
    const longInvalidString = "a".repeat(1000);
    expect(isValidImageSrc(longInvalidString)).toBe(false);
  });

  it("should return true for very long valid URLs", () => {
    const longValidUrl = "http://" + "a".repeat(995) + ".com/image.png";
    expect(isValidImageSrc(longValidUrl)).toBe(true);
  });

  it("should return false for strings with only numeric characters", () => {
    expect(isValidImageSrc("1234567890")).toBe(false);
  });

  it("should return true for valid src with special characters in the path", () => {
    expect(isValidImageSrc("https://example.com/image-name_123.png")).toBe(
      true
    );
  });

  it("should return false for boolean values", () => {
    expect(isValidImageSrc(true)).toBe(false);
    expect(isValidImageSrc(false)).toBe(false);
  });

  it("should return false for NaN", () => {
    expect(isValidImageSrc(NaN)).toBe(false);
  });

  it("should return false for Infinity", () => {
    expect(isValidImageSrc(Infinity)).toBe(false);
  });

  it("should return false for functions", () => {
    expect(isValidImageSrc(() => "http://example.com/image.png")).toBe(false);
  });

  it("should return false for symbols", () => {
    expect(isValidImageSrc(Symbol("http://example.com/image.png"))).toBe(false);
  });

  it("should return false for BigInt", () => {
    expect(isValidImageSrc(BigInt(1234567890))).toBe(false);
  });

  it("should return false for protocol-relative URLs", () => {
    expect(isValidImageSrc("//example.com/image.png")).toBe(false);
  });

  it("should return false for javascript: URLs", () => {
    expect(isValidImageSrc("javascript:alert('XSS')")).toBe(false);
  });

  it("should return false for mailto: URLs", () => {
    expect(isValidImageSrc("mailto:test@example.com")).toBe(false);
  });

  it("should return false for blob: URLs", () => {
    expect(isValidImageSrc("blob:http://example.com/1234")).toBe(false);
  });

  it("should return false for file: URLs", () => {
    expect(isValidImageSrc("file:///C:/image.png")).toBe(false);
  });

  it("should return false for http(s) URLs with spaces", () => {
    expect(isValidImageSrc("http://example.com/ima ge.png")).toBe(false);
    expect(isValidImageSrc("https://example.com/ima ge.png")).toBe(false);
  });

  it("should return true for http(s) URLs with encoded spaces", () => {
    expect(isValidImageSrc("http://example.com/image%20name.png")).toBe(true);
  });

  it("should return false for URLs with invalid characters", () => {
    expect(isValidImageSrc("http://example.com/image<>.png")).toBe(false);
  });

  it("should return false for empty object string", () => {
    expect(isValidImageSrc("[object Object]")).toBe(false);
  });


  it("should return false for src with only dots", () => {
    expect(isValidImageSrc("...")).toBe(false);
    expect(isValidImageSrc("/...")).toBe(false);
  });

  it("should return false for src with only slashes", () => {
    expect(isValidImageSrc("/////")).toBe(false);
  });

   it("should return true for valid image path", () => {
    expect(isValidImageSrc("/images/margharita.png")).toBe(true);
  });
});
