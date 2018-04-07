import { Action } from './action.interface';
import { ActionResult } from '../action-result.class';

export class RemoveItem implements Action {
    public readonly name = 'Remove Item';

    constructor(
        public targetId: string,
        public value: string,
        public count: number
    ) { }

    perform(): ActionResult {
        return new ActionResult(true);
    }
}
