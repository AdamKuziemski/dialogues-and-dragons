import { Action, ActionValue } from './action.interface';
import { ActionResult } from './action-result';

import { GameObject } from '../game-object';

export class AddItem extends GameObject implements Action {
  readonly name = 'Add Item';
  readonly hasCount = true;
  readonly hasTargetId = true;
  readonly hasValue = true;

  count = 1;
  targetId = '';
  value = '';

  constructor() {
    super();
  }

  perform(): ActionResult {
    const target = AddItem.game.actor(this.targetId);
    if (target === null) {
      return new ActionResult(false, `Actor '${this.targetId}' doesn't exist.`);
    }

    target.addItem(this.value, this.count);
    return new ActionResult(true);
  }

  getTargetIds(): string[] {
    return [];
  }

  getValues(): ActionValue[] {
    return [];
  }
}
