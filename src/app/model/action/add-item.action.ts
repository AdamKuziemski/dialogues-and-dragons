import { Action, ActionResult } from './action.interface';
import { ActionParameter, PicklistParameter } from './action-parameter';

import { GameObject } from '../game-object';
import { Actor } from '../actor/actor';
import { Item } from '@item/item';
import { Player } from '@player';

export class AddItem extends GameObject implements Action {
  readonly name = 'Add Item';

  targetId = new PicklistParameter<Actor>(Player.globalId, () => AddItem.game.actors);
  itemId = new PicklistParameter<Item>('', () => AddItem.game.items);
  count = new ActionParameter<number>(1);

  constructor() {
    super();
  }

  perform(): ActionResult {
    const target = AddItem.game.actor(this.targetId.value);
    if (target === null) {
      return new ActionResult(false, `Actor '${this.targetId.value}' doesn't exist.`);
    }

    target.addItem(this.itemId.value, this.count.value);
    return new ActionResult(true);
  }
}
