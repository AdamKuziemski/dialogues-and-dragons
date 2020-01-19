import { GameService } from './game/game.service';

import { Cloneable } from './cloneable.interface';

export class GameObject implements Cloneable {
  protected static game: GameService;

  enabled: boolean = true;

  static initializeGameService(gameService: GameService): void {
    this.game = gameService;
  }

  clone<T>(): T {
    const otherHalf = new (this.constructor as { new(): T });
    Object.keys(this).forEach((key: string) => otherHalf[key] = this[key]);

    return otherHalf;
  }

  cloneArray<T>(howMany: number): T[] {
    return howMany > 0 ? Array.from({ length: howMany }, () => this.clone<T>()) : [];
  }
}
