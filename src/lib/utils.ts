export function isValidImageSrc(src: any) {
  if (typeof src !== "string") return false;
  const trimmed = src.trim();
  if (!trimmed) return false;

  // Reject protocol-relative, data, javascript, mailto, blob, file URLs
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith("data:") ||
    lower.startsWith("javascript:") ||
    lower.startsWith("mailto:") ||
    lower.startsWith("blob:") ||
    lower.startsWith("file:") ||
    lower.startsWith("//")
  )
    return false;

  // Accept root path "/"
  if (src === "/") return true;

  // Do not accept root path "/" followed by a space
  if (src.startsWith("/") && src[1] === " ") return false;

  // Accept only http(s):// or /
  let prefix = "";
  if (lower.startsWith("http://")) prefix = "http://";
  else if (lower.startsWith("https://")) prefix = "https://";
  else if (lower.startsWith("/")) prefix = "/";
  else return false;

  // Path after prefix must not be empty or whitespace
  const afterPrefix = trimmed.slice(prefix.length);

  // Fix: return false for strings with valid prefixes but no content
  if (
    (prefix === "http://" || prefix === "https://") &&
    (afterPrefix.length === 0 || /^\s*$/.test(afterPrefix))
  ) return false;

  if (/^\s+$/.test(afterPrefix)) return false;

  // Reject if only slashes, dots, or spaces after prefix
  if (/^[\/. ]+$/.test(afterPrefix)) return false;

  // Reject if contains spaces (not encoded)
  if (/\s/.test(trimmed)) return false;

  // Reject invalid characters in path
  if (/[<>]/.test(trimmed)) return false;

  // Reject if path after "/" is only spaces (e.g. "/   ")
  if (prefix === "/" && afterPrefix.trim() === "") return false;

  // Accept only valid image extensions (can be followed by query/fragment)
  const validExt = /\.(jpg|jpeg|png|gif|webp|svg)(\?|#|$)/i;
  if (prefix === "/" && afterPrefix === "") return true; // root path
  return validExt.test(trimmed);
}
