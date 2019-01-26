export class CompareOperator {
  constructor (public operator: '==' | '!=' | '<=' | '<' | '>' | '>=') {}

  compare(left: string | number | boolean, right: string | number | boolean): boolean {
    if (left === undefined || left === null || right === undefined || right === null) {
      throw Error('Trying to compare (to) a null or undefined value: ' + left + ' ' + right);
    }

    if (typeof left !== typeof right) {
      throw Error('Cannot compare different types: ' + typeof left + ' ' + typeof right);
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
