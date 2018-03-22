import { Injectable } from '@angular/core';

import { Action } from './action.class';
import {
    ActionType,
    booleanTypes, numericTypes,
    playerActions, questActions
} from './action-type.enum';

import { SplitUpperCasePipe } from '../shared/pipes/split-upper-case.pipe';

@Injectable()
export class ActionService {
    constructor(private splitPipe: SplitUpperCasePipe) {}

    public toString(type: ActionType): string {
        return this.splitPipe.transform(ActionType[type]);
    }

    public getLabels(): string[] {
        return this.getNames().map(e => this.splitPipe.transform(e));
        // for js-fiddle
        // return getNames().map(e => { return splitPipe.transform(e); });
    }

    public getNames(): string[] {
        const names = [];
        let i = 0;

        while (ActionType[i] !== undefined) {
            const name = ActionType[i++];
            names.push(name);
        }

        return names;
    }

    public getType(action: Action): string {
        return (
            this.isBoolean(action.type) ? 'boolean' :
                this.isNumeric(action.type) ? 'number' :
                    'string');
    }

    public isBoolean(type: ActionType): boolean {
        return booleanTypes.includes(type);
    }

    public isNumeric(type: ActionType): boolean {
        return numericTypes.includes(type);
    }

    public isPlayerAction(type: ActionType): boolean {
        return playerActions.includes(type);
    }

    public isQuestAction(type: ActionType): boolean {
        return questActions.includes(type);
    }
}
