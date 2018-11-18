import { Item } from '../item/item';
import { GameObject } from '../game-object';

export class Actor extends GameObject {
  public backpack = {};
  public money = 0;
  public gender: 'Male' | 'Female' = 'Male';

  constructor(public name: string) {
    super();
  }

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
    if (id === null || id === undefined || id === '') {
      return false;
    }

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
    return Object.keys(this.backpack)
      .reduce((pack, id) => pack.concat(this.backpack[id]), []);
  }

  public addMoney(amount: number): void {
    if (amount < 0) {
      throw Error('Cannot remove money when adding it');
    }

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
    const newItem = Actor.game.item(id);

    if (newItem.isCountable) {
      newItem.count = count;
      this.backpack[id] = newItem;
    } else {
      this.backpack[id] = new Array(count).fill(newItem.clone());
    }
  }

  private increaseItemCount(id: string, count: number): void {
    this.changeItemCount(id, count, true);
  }

  private decreaseItemCount(id: string, count: number): void {
    this.changeItemCount(id, count, false);
  }

  private changeItemCount(id: string, count: number, increase: boolean): void {
    const base = Actor.game.item(id);

    if (base.isCountable) {
      const item = <Item>this.getItem(id);
      item.count += (increase ? count : count * -1);
    } else {
      const items = <Item[]>this.getItem(id);

      if (increase) {
        items.concat(new Array(count).fill(base.clone<Item>()));
      } else {
        items.splice(0, count);
      }
    }
  }
}
