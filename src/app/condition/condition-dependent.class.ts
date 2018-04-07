import { ActionContainer } from '../action/action-container.class';

import { Condition } from './conditions/condition.interface';

export class ConditionDependent extends ActionContainer {
    private conditions: Condition[] = [];

    constructor() {
        super();
    }

    public get available(): boolean {
        for (const cnd of this.conditions) {
            if (!cnd.evaluate()) {
                return false;
            }
        }
        return true;
    }

    public addCondition(added: Condition): void {
        this.conditions.push(added);
    }

    public removeCondition(index: number): void {
        if (index < 0 || index >= this.conditions.length) {
            return;
        }

        this.conditions.splice(index, 1);
        // might be needed if action lists don't display an empty list after splicing the last action
        /* if (this.conditions.length === 0) {
            this.clearConditions();
        } */
    }

    public clearConditions(): void {
        this.conditions = [];
    }
}
