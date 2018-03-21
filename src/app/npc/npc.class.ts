import { Actor } from '../actor/actor.class';

export class NPC extends Actor {
    private uid: string;

    constructor(public name: string) {
        super(name);
    }
}
