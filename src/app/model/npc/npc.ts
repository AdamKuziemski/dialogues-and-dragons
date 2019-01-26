import { Actor } from '../actor/actor';

import { Dialogue } from '../dialogue/dialogue';

export class NPC extends Actor {
  constructor(public name: string) {
    super(name);
  }

  dialogue: Dialogue = new Dialogue();
  disposition = {};
  isMerchant = false;

  setDisposition(id: string, value: number): void {
    this.disposition[id] = value;
  }
}
