import { Condition } from './condition.interface';

import { CompareOperator } from '../compare-operator';

export class DispositionTowardsPlayer implements Condition {
  readonly name = 'Disposition Towards Player';
  operator: CompareOperator;
  id: string;
  value: number;

  evaluate(): boolean {
    try {
      return this.operator.compare(this.value, 0);
    } catch (e) {
      console.log(this.name + ': ' + e.message);
      return false;
    }
  }
}
