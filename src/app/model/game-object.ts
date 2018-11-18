import { GameService } from './game/game.service';

import { Cloneable } from './cloneable.interface';

export class GameObject implements Cloneable {
  protected static game: GameService;

  public enabled = true;

  public static initializeGameService(gameService: GameService) {
    this.game = gameService;
  }

  public clone<T>(): T {
    const otherHalf = new (this.constructor as { new(): T });
    Object.keys(this).forEach(key => otherHalf[key] = this[key]);
    return otherHalf;
  }

  public cloneArray<T>(howMany: number): T[] {
    return howMany > 0 ? Array.from({ length: howMany }, () => this.clone<T>()) : [];
  }

  protected lastOf(array: any[]): any {
    return array.length > 0 ? array[array.length - 1] : null;
  }
}
