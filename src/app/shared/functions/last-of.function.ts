export function lastOf<T>(array: T[]): T | undefined {
  return array[array.length - 1];
}
