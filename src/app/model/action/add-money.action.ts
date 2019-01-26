import { Action, ActionValue } from './action.interface';
import { ActionResult } from './action-result';

import { GameObject } from '../game-object';

export class AddMoney extends GameObject implements Action {
  readonly name = 'Add Money';
  readonly hasCount = true;
  readonly hasTargetId = true;
  readonly hasValue = false;

  count = 0;
  targetId = '';
  value = 0;

  constructor() {
    super();
  }

  perform(): ActionResult {
    const target = AddMoney.game.actor(this.targetId);
    if (target === null) {
      return new ActionResult(false, `Actor '${this.targetId}' doesn't exist.`);
    }

    target.addMoney(this.count);
    return new ActionResult(true);
  }

  getTargetIds(): string[] {
    return [];
  }

  getValues(): ActionValue[] {
    return [];
  }
}
