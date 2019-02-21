import { Action, ActionValue } from './action.interface';
import { ActionResult } from './action-result';

import { GameObject } from '../game-object';

export class SetQuestStage extends GameObject implements Action {
  readonly name = 'Set Quest Stage';
  readonly hasCount = false;
  readonly hasTargetId = true;
  readonly hasValue = true;
  readonly targetType = 'quest';

  count = 0;
  targetId = '';
  value = 0;

  constructor() {
    super();
  }

  perform(): ActionResult {
    const target = SetQuestStage.game.quest(this.targetId);
    if (target === null) {
      return new ActionResult(false, `Quest '${this.targetId}' doesn't exist.`);
    }

    target.setStage(this.value);
    return new ActionResult(true);
  }

  getTargets(): Object {
    return SetQuestStage.game.quests;
  }

  getValues(): ActionValue[] {
    return [];
  }
}
