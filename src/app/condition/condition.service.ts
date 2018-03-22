import { Injectable } from '@angular/core';

import { Condition } from './condition.class';
import {
    ConditionType,
    booleanTypes, numericTypes,
    playerConditions, questConditions, actorConditions
} from './condition-type.enum';

import { SplitUpperCasePipe } from '../shared/pipes/split-upper-case.pipe';

@Injectable()
export class ConditionService {
    constructor(private splitPipe: SplitUpperCasePipe) {}

    public toString(condition: Condition): string {
        return this.splitPipe.transform(ConditionType[condition.type]);
    }

    public getLabels(): string[] {
        return this.getNames().map(e => this.splitPipe.transform(e));
        // for js-fiddle
        // return getNames().map(e => { return splitUpperCase(e); });
    }

    public getNames(): string[] {
        const names = [];
        let i = 0;

        while (ConditionType[i] !== undefined) {
            const name = ConditionType[i++];
            names.push(name);
        }

        return names;
    }

    public getType(condition: Condition): string {
        return (
            this.isBoolean(condition.type) ? 'boolean' :
                this.isNumeric(condition.type) ? 'number' :
                    'string');
    }

    public isBoolean(type: ConditionType): boolean {
        return booleanTypes.includes(type);
    }

    public isNumeric(type: ConditionType): boolean {
        return numericTypes.includes(type);
    }

    public isPlayerCondition(type: ConditionType): boolean {
        return playerConditions.includes(type);
    }

    public isActorCondition(type: ConditionType): boolean {
        return actorConditions.includes(type);
    }

    public isQuestCondition(type: ConditionType): boolean {
        return questConditions.includes(type);
    }
}
