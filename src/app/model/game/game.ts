import { Item } from '../item/item';
import { Player } from '../player/player';
import { NPC } from '../npc/npc';

export class Game {
  constructor(public title: string) {}

  public items = {};
  public player: Player = null;
  public npcs = {};

  createItem(id: string, name: string): Item {
    if (!this.hasItem(id)) {
      this.items[id] = new Item(name);
    }

    return this.items[id];
  }

  createPlayer(name: string): Player {
    this.player = new Player(name);
    return this.player;
  }

  createNPC(id: string, name: string): NPC {
    if (!this.hasNPC(id)) {
      this.npcs[id] = new NPC(name);
    }

    return this.npcs[id];
  }

  hasItem(id: string): boolean {
    return this.items.hasOwnProperty(id);
  }

  hasPlayer(): boolean {
    return this.player !== null;
  }

  hasNPC(id: string): boolean {
    return this.npcs.hasOwnProperty(id);
  }
}
