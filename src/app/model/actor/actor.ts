import { GameService } from '../game/game.service';

import { Item } from '../item/item';

export class Actor {
    public backpack: {};
    public money = 0;
    public gender: 'Male' | 'Female' = 'Male';
    protected game: GameService;

    constructor(public name: string) { }

    public addItem(id: string, count = 1): void {
        if (this.hasItem(id)) {
            this.increaseItemCount(id, count);
        } else {
            this.createItem(id, count);
        }
    }

    public removeItem(id: string, count = 1): void {
        if (!this.hasItem(id) || count < 0) {
            return;
        }

        if (this.getItemCount(id) > count) {
            this.decreaseItemCount(id, count);
        } else {
            delete this.backpack[id];
        }
    }

    public hasItem(id: string): boolean {
        return this.backpack.hasOwnProperty(id);
    }

    public getItemCount(id: string): number {
        if (this.hasItem(id)) {
            const item = this.getItem(id);
            return (Array.isArray(item) ? item.length : item.count);
        }
        return 0;
    }

    public getItem(id: string): Item | Item[] {
        return this.hasItem(id) ? this.backpack[id] : null;
    }

    public getBackpack(): Item[] {
        const items = Object.keys(this.backpack);
        const result: Item[] = [];

        for (let i = 0; i < items.length; ++i) {
            const key = items[i];
            const item = this.backpack[key];

            if (Array.isArray(item)) {
                result.push(...<Item[]>item);
            } else {
                result.push(<Item>item);
            }
        }

        return result;
    }

    public addMoney(amount: number): void {
        this.money += amount;
    }

    public removeMoney(amount: number): void {
        if ((this.money -= amount) < 0) {
            this.money = 0;
        }
    }

    public hasMoney(amount: number): boolean {
        return this.money >= amount;
    }

    private createItem(id: string, count: number): void {
        const newItem = this.game.item(id);

        if (newItem.isCountable) {
            newItem.count = count;
            this.backpack[id] = newItem;
        } else {
            const itemArray: Item[] = [];

            for (let i = 0; i < count; ++i) {
                itemArray.push(newItem.clone());
            }

            this.backpack[id] = itemArray;
        }
    }

    private increaseItemCount(id: string, count: number): void {
        this.changeItemCount(id, count, true);
    }

    private decreaseItemCount(id: string, count: number): void {
        this.changeItemCount(id, count, false);
    }

    private changeItemCount(id: string, count: number, increase: boolean): void {
        const base = this.game.item(id);

        if (base.isCountable) {
            const item = <Item>this.getItem(id);
            item.count += (increase ? count : count * -1);
        } else {
            const items = <Item[]>this.getItem(id);
            while (count--) {
                if (increase) {
                    items.push(this.game.item(id));
                } else {
                    items.pop();
                }
            }
        }
    }
}
