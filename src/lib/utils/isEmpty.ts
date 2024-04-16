export default function isEmpty(input: string | unknown[] | undefined | null) {
  if (typeof input === "undefined" || input === null) {
    return true;
  }

  if (Array.isArray(input)) {
    return input.length === 0 || input.every((val) => !val);
  }

  if (typeof input === "string") {
    return input.trim() === "";
  }

  return false;
}
