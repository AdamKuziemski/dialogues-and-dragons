import { ActionContainer } from '../action/action-container.class';

export class Item extends ActionContainer {
    public count = 0;

    constructor(public id: string, public name: string) {
        super();
    }
}
