export interface Cloneable {
  clone<T>(): T;
  cloneArray<T>(howMany: number): T[];
}
