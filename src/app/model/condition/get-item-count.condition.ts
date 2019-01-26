import { Condition } from './condition.interface';

import { CompareOperator } from '../compare-operator';

export class GetItemCount implements Condition {
  readonly name = 'Get Item Count';
  operator: CompareOperator;
  id: string;
  value: number;

  evaluate(): boolean {
    return this.operator.compare(this.value, 0);
  }
}
