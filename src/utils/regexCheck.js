export function emailCheck(value) {
  if (value.match(/\w{4,}@\w{2,}\.\w{2,}/g)) return true;
  return false;
}

export function lengthCheck(value, length) {
  if (value?.length >= length) return true;
  return false;
}
