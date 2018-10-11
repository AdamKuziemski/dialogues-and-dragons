import { GameService } from './game/game.service';

import { Cloneable } from './cloneable.interface';

export class GameObject implements Cloneable {
    protected static game: GameService;

    public static initializeGameService(gameService: GameService) {
        this.game = gameService;
    }

    public clone<T>(): T {
        const otherHalf = new (this.constructor as { new (): T });
        const keys = Object.keys(this);

        for (let i = 0; i < keys.length; ++i) {
            const property = keys[i];
            otherHalf[property] = this[property];
        }

        return otherHalf;
    }

    protected lastOf(array: any[]): any {
        return array.length > 0 ? array[array.length - 1] : null;
    }
}
