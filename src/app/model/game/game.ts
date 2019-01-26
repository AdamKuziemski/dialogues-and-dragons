import { Item } from '../item/item';
import { NPC } from '../npc/npc';
import { Player } from '../player/player';
import { Quest } from '../quest/quest';

export class Game {
  constructor(public title: string) { }

  items = {};
  itemTypes: string[] = [];

  player: Player = null;
  npcs = {};

  quests = {};

  createItem(id: string, name: string): Item {
    if (!this.hasItem(id)) {
      this.items[id] = new Item(name);
    }

    return this.items[id];
  }

  createItemType(name: string): void {
    if (!this.hasItemType(name)) {
      this.itemTypes.push(name);
    }
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

  createQuest(id: string, name: string): Quest {
    if (!this.hasQuest(id)) {
      this.quests[id] = new Quest(name);
    }

    return this.quests[id];
  }

  hasItem(id: string): boolean {
    return this.items.hasOwnProperty(id);
  }

  hasItemType(name: string): boolean {
    return this.itemTypes.includes(name);
  }

  hasPlayer(): boolean {
    return this.player !== null;
  }

  hasNPC(id: string): boolean {
    return this.npcs.hasOwnProperty(id);
  }

  hasQuest(id: string): boolean {
    return this.quests.hasOwnProperty(id);
  }
}
