import { Action } from './action.interface';
import { ActionResult } from '../action-result.class';

export class SetQuestStage implements Action {
    public readonly name = 'Set Quest Stage';

    constructor(
        public targetId: string,
        public value: string,
        public count: number
    ) { }

    perform(): ActionResult {
        return new ActionResult(true);
    }
}
