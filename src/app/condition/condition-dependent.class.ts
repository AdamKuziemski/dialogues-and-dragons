import { ActionContainer } from '../action/action-container.class';
import { Condition } from './condition.class';

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

    public addCondition(added: Condition) {
        this.conditions.push(added);
    }

    public clearConditions(): void {
        this.conditions = [];
    }
}
