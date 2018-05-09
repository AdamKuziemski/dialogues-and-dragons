import { Action } from './action.interface';
import { ActionResult } from './action-result';

import { GameObject } from '../game-object';

export class AddItem extends GameObject implements Action {
    public readonly name = 'Add Item';

    constructor(
        public targetId: string,
        public value: string,
        public count: number
    ) {
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
}
