import { ConditionType } from './condition-type.enum';
import { ConditionService } from './condition.service';

export class Condition {
    constructor(
        public type: ConditionType,
        public operator: string,
        public id: string,
        public value: string,
        private svc: ConditionService
    ) { }

    public evaluate(): boolean {
        switch (this.type) {
            case ConditionType.DispositionTowardsPlayer: return true;
            case ConditionType.GetItemCount: return true;
            case ConditionType.HasItem: return true;
            case ConditionType.Name: return true;
            case ConditionType.QuestStage: return true;
            default: return false;
        }
    }

    private compare(a: string | number | boolean, b: string): boolean {
        try {
            switch (this.operator) {
                case '==': return a === this.parseValue(b);
                case '!=': return a !== this.parseValue(b);
                case '<=': return a <= this.parseValue(b);
                case '<': return a < this.parseValue(b);
                case '>': return a > this.parseValue(b);
                case '>=': return a >= this.parseValue(b);
                default: return false;
            }
        } catch (e) {
            console.log(`couldn't compare different types`, e);
            return false;
        }
    }

    private parseValue(value: string): string | number | boolean {
        return (
            this.svc.isBoolean(this.type) ? value === 'true' :
                this.svc.isNumeric(this.type) ? (!isNaN(+value) ? +value : 0) :
                    value);
    }
}
