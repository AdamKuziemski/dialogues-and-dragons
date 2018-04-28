import { CompareOperator } from '../compare-operator';

export interface Condition {
  readonly name: string;
  operator: CompareOperator;
  id: string;
  value: string | number | boolean;

  evaluate(): boolean;
}
