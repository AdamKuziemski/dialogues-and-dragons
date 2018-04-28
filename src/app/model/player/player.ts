import { Actor } from '../actor/actor';

import { GameService } from '../game/game.service';

export class Player extends Actor {
  constructor(name: string) {
    super(name);
  }
}
