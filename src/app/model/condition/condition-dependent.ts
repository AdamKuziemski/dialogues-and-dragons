import { ActionContainer } from '../action/action-container';

import { Condition } from './condition.interface';

export class ConditionDependent extends ActionContainer {
  private conditions: Condition[] = [];

  constructor() {
    super();
  }

  get available(): boolean {
    return this.conditions.filter(condition => condition.evaluate()).length === this.conditions.length;
  }

  addCondition(added: Condition): void {
    this.conditions.push(added);
  }

  removeCondition(index: number): void {
    if (index < 0 || index >= this.conditions.length) {
      return;
    }

    this.conditions.splice(index, 1);
    // might be needed if action lists don't display an empty list after splicing the last action
    /* if (this.conditions.length === 0) {
        this.clearConditions();
    } */
  }

  clearConditions(): void {
    this.conditions = [];
  }
}
