import { Injectable } from '@angular/core';

import { Game } from './game.class';
import { Item } from '../item/item.class';
import { Player } from '../player/player.class';
import { NPC } from '../npc/npc.class';

@Injectable()
export class GameService {
  private game: Game = null;

  createGame(title: string): Game {
    this.game = new Game(title);
    // insert the game into the database
    return this.game;
  }

  // getGameList(): Game[] {}

  getGame(id: string): Game {
    // get a game from the database
    return this.game;
  }

  loadGame(playerId: string): Game {
    // get a saved game from the database
    return this.game;
  }

  createItem(id: string, name: string): Item {
    const createdItem = this.game.createItem(id, name);
    // insert the item into the database
    return createdItem;
  }

  item (id: string): Item {
    return this.game.hasItem(id) ? this.game.items[id].clone() : null;
  }

  createPlayer(name: string): Player {
    return this.game.createPlayer(name);
    // create a savegame?
  }

  get player(): Player {
    return (this.game && this.game.hasPlayer() ? this.game.player : null);
  }

  createNPC(id: string, name: string): NPC {
    const createdNPC = this.game.createNPC(id, name);
    // insert the npc into the database
    return createdNPC;
  }

  npc(id: string): NPC {
    return this.game.hasNPC(id) ? this.game.npcs[id] : null;
  }
}
