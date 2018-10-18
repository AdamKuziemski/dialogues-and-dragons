import { Condition } from './condition.interface';

import { CompareOperator } from '../compare-operator';

export class HasItem implements Condition {
  public readonly name = 'Has Item';
  public operator: CompareOperator;
  public id: string;
  public value: number;

  evaluate(): boolean {
    return this.operator.compare(this.value, 0);
  }
}
