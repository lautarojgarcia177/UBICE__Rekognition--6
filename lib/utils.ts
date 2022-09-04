export function useRegex(input) {
  let regex = /^[0-9]+$/i;
  return regex.test(input);
}
