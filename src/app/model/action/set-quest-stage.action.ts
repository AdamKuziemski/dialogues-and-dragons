import { Action, ActionValue } from './action.interface';
import { ActionResult } from './action-result';

import { GameObject } from '../game-object';

export class SetQuestStage extends GameObject implements Action {
  readonly name = 'Set Quest Stage';
  readonly hasCount = true;
  readonly hasTargetId = false;
  readonly hasValue = true;

  count = 0;
  targetId = '';
  value = 0;

  constructor() {
    super();
  }

  perform(): ActionResult {
    return new ActionResult(true);
  }

  getTargetIds(): string[] {
    return [];
  }

  getValues(): ActionValue[] {
    return [];
  }
}
