import { Actor } from '../actor/actor';

import { Dialogue } from '../dialogue/dialogue';

import { GameService } from '../game/game.service';

export class NPC extends Actor {
  constructor(public name: string) {
    super(name);
  }

  dialogue: Dialogue;
  disposition = {};

  setDisposition(id: string, value: number) {
    this.disposition[id] = value;
  }
}
