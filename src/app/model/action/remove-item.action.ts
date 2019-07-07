import { Action, ActionResult } from './action.interface';
import { ActionParameter, PicklistParameter } from './action-parameter';

import { GameObject } from '../game-object';
import { Actor } from '../actor/actor';
import { Item } from '@item/item';
import { Player } from '@player';

export class RemoveItem extends GameObject implements Action {
  readonly name = 'Remove Item';

  targetId = new PicklistParameter<Actor>(Player.globalId, () => RemoveItem.game.actors, true);
  itemId = new PicklistParameter<Item>('', () => RemoveItem.game.items);
  amount = new ActionParameter<number>(1);

  constructor() {
    super();
  }

  perform(): ActionResult {
    const target = RemoveItem.game.actor(this.targetId.value);
    if (target === null) {
      return new ActionResult(false, `Actor '${this.targetId.value}' doesn't exist`);
    }

    try {
      target.removeItem(this.itemId.value, this.amount.value);
      return new ActionResult(true);
    } catch (error) {
      return new ActionResult(false, error.message);
    }
  }
}
