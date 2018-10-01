import { Action, ActionValue } from './action.interface';
import { ActionResult } from './action-result';

import { GameObject } from '../game-object';

export class SetQuestStage extends GameObject implements Action {
    public readonly name = 'Set Quest Stage';
    public readonly hasCount = true;
    public readonly hasTargetId = false;
    public readonly hasValue = true;

    public count = 0;
    public targetId = '';
    public value = 0;

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
