export class CompareOperator {
  constructor (public operator: '==' | '!=' | '<=' | '<' | '>' | '>=') {}

  public compare(left: string | number | boolean, right: string | number | boolean): boolean {
    if (typeof left !== typeof right) {
      throw Error('Cannot compare different types');
    }

    switch (this.operator) {
      case '==': return left === right;
      case '!=': return left !== right;
      case '<=': return left <= right;
      case '<': return left < right;
      case '>': return left > right;
      case '>=': return left >= right;
      default: return false;
    }
  }
}
