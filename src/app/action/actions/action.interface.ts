import { ActionResult } from '../action-result.class';

export interface Action {
    readonly name: string;

    targetId: string;
    value: string | number | boolean;
    count: number;

    perform(): ActionResult;
}
