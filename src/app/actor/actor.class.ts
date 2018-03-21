import { Item } from '../item/item.class';

export class Actor {
    private readonly NotAnItem = new Item('NotAnItem', 'Not An Item');
    public backpack: {};
    public money = 0;

    constructor(public name: string) { }

    public addItem(item: Item): void {
        if (this.hasItem(item)) {
            this.getItem(item).count += item.count;
        } else {
            this.backpack[item.id] = item;
        }
    }

    public removeItem(item: Item): void {
        if (!this.hasItem(item)) {
            return;
        }

        const myItem = this.getItem(item);
        if ((myItem.count -= item.count) < 0) {
            delete this.backpack[item.id];
        }
    }

    public hasItem(item: Item): boolean {
        return this.backpack.hasOwnProperty(item.id);
    }

    public getItemCount(item: Item): number {
        return this.getItem(item).count;
    }

    public getItem(item: Item): Item {
        return this.backpack.hasOwnProperty(item.id) ? this.backpack[item.id] : { count: 0 };
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
}
