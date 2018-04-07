import { Condition } from './condition.interface';

import { CompareOperator } from '../../shared/compare-operator.class';

export class QuestStage implements Condition {
    public readonly name = 'Quest Stage';
    public operator: CompareOperator;
    public id: string;
    public value: number;

    evaluate(): boolean {
        return this.operator.compare(this.value, 0);
    }
}
