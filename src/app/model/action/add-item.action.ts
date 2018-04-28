import { Action } from './action.interface';
import { ActionResult } from './action-result';
import { GameService } from '../game/game.service';
import { Item } from '../item/item';

export class AddItem implements Action {
    public readonly name = 'Add Item';

    constructor(
        public targetId: string,
        public value: string,
        public count: number,
        private gameService: GameService
    ) { }

    perform(): ActionResult {
        if (this.targetId === 'player') {
            this.gameService.player.addItem(this.value);
        } else {
            this.gameService.npc(this.targetId).addItem(this.value);
        }

        return new ActionResult(true);
    }
}
