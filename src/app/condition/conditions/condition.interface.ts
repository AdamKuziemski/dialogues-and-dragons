import { CompareOperator } from '../../shared/compare-operator.class';

export interface Condition {
  readonly name: string;
  operator: CompareOperator;
  id: string;
  value: string | number | boolean;

  evaluate(): boolean;
}
