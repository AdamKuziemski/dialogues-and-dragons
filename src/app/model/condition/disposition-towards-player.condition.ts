import { Condition } from './condition.interface';

import { CompareOperator } from '../compare-operator';

export class DispositionTowardsPlayer implements Condition {
    public readonly name = 'Disposition Towards Player';
    public operator: CompareOperator;
    public id: string;
    public value: number;

    evaluate(): boolean {
        return this.operator.compare(this.value, 0);
    }
}
