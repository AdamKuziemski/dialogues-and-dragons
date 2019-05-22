import { Item } from '../item/item';
import { NPC } from '../npc/npc';
import { Player } from '../player/player';
import { Quest } from '../quest/quest';

export class Game {
  constructor(public title: string) { }

  player: Player = null;

  itemTypes: string[] = [];

  items = new Map<string, Item>();
  npcs = new Map<string, NPC>();
  quests = new Map<string, Quest>();

  createItem(id: string, name: string): Item {
    if (!this.hasItem(id)) {
      this.items.set(id, new Item(name));
    }

    return this.items.get(id);
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
      this.npcs.set(id, new NPC(name));
    }

    return this.npcs.get(id);
  }

  createQuest(id: string, name: string): Quest {
    if (!this.hasQuest(id)) {
      this.quests.set(id, new Quest(name));
    }

    return this.quests.get(id);
  }

  hasItem(id: string): boolean {
    return this.items.has(id);
  }

  hasItemType(name: string): boolean {
    return this.itemTypes.includes(name);
  }

  hasPlayer(): boolean {
    return this.player !== null;
  }

  hasNPC(id: string): boolean {
    return this.npcs.has(id);
  }

  hasQuest(id: string): boolean {
    return this.quests.has(id);
  }

  removeItem(id: string): boolean {
    return this.items.delete(id);
  }

  removeNPC(id: string): boolean {
    return this.npcs.delete(id);
  }

  removeQuest(id: string): boolean {
    return this.quests.delete(id);
  }
}
