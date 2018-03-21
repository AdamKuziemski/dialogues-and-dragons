import { ActionType } from './action-type.enum';
import { ActionService } from './action.service';

export class Action {
    constructor(
        public type: ActionType,
        public id: string,
        public value: string,
        private svc: ActionService
    ) { }

    public perform(): boolean {
        let success = true;

        switch (this.type) {
            case ActionType.AddItem: break;
            case ActionType.RemoveItem: success = false; break;
            case ActionType.SetQuestStage: break;
            default: break;
        }

        return success;
    }

    private parseValue(value: string): string | number | boolean {
        return (
            this.svc.isNumeric(this.type) ? (!isNaN(+value) ? +value : 0) :
                this.svc.isBoolean(this.type) ? value === 'true' :
                    value);
    }
}
