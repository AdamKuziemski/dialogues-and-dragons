import { Action } from './action.interface';
import { ActionResult } from './action-result';

import { GameObject } from '../game-object';

export class ActionContainer extends GameObject {
  actions: Action[] = [];

  addAction(action: Action): Action {
    this.actions.push(action);
    return action;
  }

  removeAction(index: number): void {
    if (index < 0 || index >= this.actions.length) {
      return;
    }

    this.actions.splice(index, 1);
  }

  clearActions(): void {
    this.actions = [];
  }

  performActions(): ActionResult[] {
    return this.actions.map(action => action.perform()).filter(result => !result.success);
  }
}
