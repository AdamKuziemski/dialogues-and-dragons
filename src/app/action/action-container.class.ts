import { Action } from './action.class';

import { ArrayToolkit } from '../shared/array-toolkit.class';

export class ActionContainer extends ArrayToolkit {
    public actions: Action[] = [];

    public addAction(action: Action): Action {
        this.actions.push(action);
        return this.lastOf(this.actions);
    }

    public performActions(): void {
        this.actions.forEach(e => e.perform());
    }
}
