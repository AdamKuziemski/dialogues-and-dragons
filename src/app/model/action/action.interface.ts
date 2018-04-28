import { ActionResult } from './action-result';

export interface Action {
    readonly name: string;

    targetId: string;
    value: string | number | boolean;
    count: number;

    perform(): ActionResult;
}
