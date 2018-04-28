import { ConditionDependent } from '../condition/condition-dependent';

export class DialogueLine extends ConditionDependent {
    constructor(public line: string, public isGreeting = false) {
        super();
    }
}
