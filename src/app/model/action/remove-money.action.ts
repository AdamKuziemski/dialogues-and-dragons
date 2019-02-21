import { Action, ActionValue } from './action.interface';
import { ActionResult } from './action-result';

import { GameObject } from '../game-object';

export class RemoveMoney extends GameObject implements Action {
  readonly name = 'Remove Money';
  readonly hasCount = true;
  readonly hasTargetId = true;
  readonly hasValue = false;
  readonly targetType = 'actor'

  count = 0;
  targetId = '';
  value = 0;

  constructor() {
    super();
  }

  perform(): ActionResult {
    const target = RemoveMoney.game.actor(this.targetId);
    if (target === null) {
      return new ActionResult(false, `Actor '${this.targetId}' doesn't exist.`);
    }

    target.removeMoney(this.count);
    return new ActionResult(true);
  }

  getTargets(): Object {
    return RemoveMoney.game.npcs;
  }

  getValues(): ActionValue[] {
    return [];
  }
}
