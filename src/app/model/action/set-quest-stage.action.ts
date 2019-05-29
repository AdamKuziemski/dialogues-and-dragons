import { Action, ActionResult } from './action.interface';
import { ActionParameter, PicklistParameter } from './action-parameter';

import { GameObject } from '../game-object';
import { Quest } from '@quest/quest';

export class SetQuestStage extends GameObject implements Action {
  readonly name = 'Set Quest Stage';

  questId = new PicklistParameter<Quest>('', () => SetQuestStage.game.quests);
  stage = new ActionParameter<number>(0);

  constructor() {
    super();
  }

  perform(): ActionResult {
    const target = SetQuestStage.game.quest(this.questId.value);
    if (target === null) {
      return new ActionResult(false, `Quest '${this.questId.value}' doesn't exist.`);
    }

    target.setStage(this.stage.value);
    return new ActionResult(true);
  }
}
