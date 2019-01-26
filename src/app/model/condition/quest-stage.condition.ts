import { Condition } from './condition.interface';

import { CompareOperator } from '../compare-operator';

export class QuestStage implements Condition {
  readonly name = 'Quest Stage';
  operator: CompareOperator;
  id: string;
  value: number;

  evaluate(): boolean {
    return this.operator.compare(this.value, 0);
  }
}
