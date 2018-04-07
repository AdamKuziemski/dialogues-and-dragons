import { Action } from './action.interface';
import { ActionResult } from '../action-result.class';

export class AddItem implements Action {
    public readonly name = 'Add Item';

    constructor(
        public targetId: string,
        public value: string,
        public count: number
    ) { }

    perform(): ActionResult {
        return new ActionResult(true);
    }
}
