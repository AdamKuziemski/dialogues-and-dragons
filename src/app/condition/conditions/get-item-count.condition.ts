import { Condition } from './condition.interface';

import { CompareOperator } from '../../shared/compare-operator.class';

export class GetItemCount implements Condition {
    public readonly name = 'Get Item Count';
    public operator: CompareOperator;
    public id: string;
    public value: number;

    evaluate(): boolean {
        return this.operator.compare(this.value, 0);
    }
}
