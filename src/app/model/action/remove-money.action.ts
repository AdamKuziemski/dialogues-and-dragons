import { Action, ActionValue } from './action.interface';
import { ActionResult } from './action-result';

import { GameObject } from '../game-object';

export class RemoveMoney extends GameObject implements Action {
  public readonly name = 'Remove Money';
  public readonly hasCount = true;
  public readonly hasTargetId = true;
  public readonly hasValue = false;

  public count = 0;
  public targetId = '';
  public value = 0;

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

  getTargetIds(): string[] {
    return [];
  }

  getValues(): ActionValue[] {
    return [];
  }
}
