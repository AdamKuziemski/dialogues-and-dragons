import { Action } from './action.interface';
import { ActionResult } from './action-result';

import { GameObject } from '../game-object';

export class ActionContainer extends GameObject {
  public actions: Action[] = [];

  public addAction(action: Action): Action {
    this.actions.push(action);
    return action;
  }

  public removeAction(index: number): void {
    if (index < 0 || index >= this.actions.length) {
      return;
    }

    this.actions.splice(index, 1);
  }

  public clearActions(): void {
    this.actions = [];
  }

  public performActions(): ActionResult[] {
    return this.actions.map(action => action.perform()).filter(result => !result.success);
  }
}
