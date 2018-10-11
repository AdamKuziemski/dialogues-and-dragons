import { Action, ActionValue } from './action.interface';
import { ActionResult } from './action-result';

import { GameObject } from '../game-object';

export class RemoveItem extends GameObject implements Action {
    public readonly name = 'Remove Item';
    public readonly hasCount = true;
    public readonly hasTargetId = true;
    public readonly hasValue = true;

    public count = 1;
    public targetId = '';
    public value = '';

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

    getTargetIds(): string[] {
        return [];
    }

    getValues(): ActionValue[] {
        return [];
    }
}
