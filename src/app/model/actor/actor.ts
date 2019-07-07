import { Item } from '../item/item';
import { GameObject } from '../game-object';

export class Actor extends GameObject {
  public backpack = {};
  public money = 0;
  public gender: 'Male' | 'Female' = 'Male';

  constructor(public name: string) {
    super();
  }

  addItem(id: string, count = 1): void {
    if (count <= 0) {
      throw Error(`Cannot remove an item by adding a negative value`);
    }

    if (this.hasItem(id)) {
      this.increaseItemCount(id, count);
    } else {
      this.createItem(id, count);
    }
  }

  removeItem(id: string, count = 1): void {
    if (!this.hasItem(id)) {
      throw Error(`Cannot remove an item because it's not in the backpack (id: ${id})`);
    }

    if (count <= 0) {
      throw Error(`Cannot add an item by removing a negative value`);
    }

    if (this.getItemCount(id) > count) {
      this.decreaseItemCount(id, count);
    } else {
      delete this.backpack[id];
    }
  }

  hasItem(id: string): boolean {
    if (id === null || id === undefined || id === '') {
      return false;
    }

    return this.backpack.hasOwnProperty(id);
  }

  getItemCount(id: string): number {
    if (this.hasItem(id)) {
      const item = this.getItem(id);
      return (Array.isArray(item) ? item.length : item.count);
    }
    return 0;
  }

  getItem(id: string): Item | Item[] {
    return this.hasItem(id) ? this.backpack[id] : null;
  }

  getBackpack(): Item[] {
    return Object.keys(this.backpack)
      .reduce((pack, id) => pack.concat(this.backpack[id]), []);
  }

  addMoney(amount: number): void {
    if (amount < 0) {
      throw Error('Cannot remove money when adding it');
    }

    this.money += amount;
  }

  removeMoney(amount: number): void {
    if (amount < 0) {
      throw Error('Cannot add money by removing a negative value');
    }

    if ((this.money -= amount) < 0) {
      this.money = 0;
    }
  }

  hasMoney(amount: number): boolean {
    return this.money >= amount;
  }

  private createItem(id: string, count: number): void {
    const newItem = Actor.game.item(id);

    if (newItem === null) {
      throw Error(`Cannot add an item that does not exist (id: ${id})`);
    }

    if (newItem.isCountable) {
      newItem.count = count;
      this.backpack[id] = newItem;
    } else {
      this.backpack[id] = newItem.cloneArray<Item>(count);
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
      this.backpack[id].count += (increase ? count : count * -1);
    } else if (increase) {
      this.backpack[id].push(...base.cloneArray<Item>(count));
    } else {
      this.backpack[id].splice(0, count);
    }
  }
}
