import { ConditionDependent } from '../../condition/condition-dependent.class';

export class DialogueLine extends ConditionDependent {
    constructor(public line: string, public isGreeting = false) {
        super();
    }
}
