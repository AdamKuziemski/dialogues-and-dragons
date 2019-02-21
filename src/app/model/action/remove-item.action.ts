import { Action, ActionValue } from './action.interface';
import { ActionResult } from './action-result';

import { GameObject } from '../game-object';

export class RemoveItem extends GameObject implements Action {
  readonly name = 'Remove Item';
  readonly hasCount = true;
  readonly hasTargetId = true;
  readonly hasValue = true;
  readonly targetType = 'actor'

  count = 1;
  targetId = '';
  value = '';

  constructor() {
    super();
  }

  perform(): ActionResult {
    const target = RemoveItem.game.actor(this.targetId);
    if (target === null) {
      return new ActionResult(false, `Actor '${this.targetId}' doesn't exist.`);
    }

    target.removeItem(this.value, this.count);
    return new ActionResult(true);
  }

  getTargets(): Object {
    return RemoveItem.game.npcs;
  }

  getValues(): ActionValue[] {
    return [];
  }
}
