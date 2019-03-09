import { Actor } from '../actor/actor';

import { Dialogue } from '../dialogue/dialogue';

export class NPC extends Actor {
  static readonly maximumNameLength = 50;

  dialogue: Dialogue = new Dialogue();
  disposition = {};
  isMerchant = false;

  constructor(public name: string) {
    super(name);
  }

  setDisposition(id: string, value: number): void {
    this.disposition[id] = value;
  }
}
