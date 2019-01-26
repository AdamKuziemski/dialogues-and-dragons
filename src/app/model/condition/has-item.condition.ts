import { Condition } from './condition.interface';

import { CompareOperator } from '../compare-operator';

export class HasItem implements Condition {
  readonly name = 'Has Item';
  operator: CompareOperator;
  id: string;
  value: number;

  evaluate(): boolean {
    return this.operator.compare(this.value, 0);
  }
}
