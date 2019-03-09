import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Actor } from '../actor/actor';
import { Game } from './game';
import { Item } from '../item/item';
import { NPC } from '../npc/npc';
import { Player } from '../player/player';
import { Quest } from '../quest/quest';

@Injectable()
export class GameService {
  private game: Game = null;
  private editSubject = new Subject<boolean>();
  editMode = true;
  isEditModeAvailable = true; // depends on the user being logged in AND the owner of the game

  get editModeChange(): Observable<boolean> {
    return this.editSubject.asObservable();
  }

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

  // test purposes only
  setGame(newGame: Game): void {
    this.game = newGame;
  }

  createItem(id: string, name: string): Item {
    if (!this.game) {
      return null;
    }

    const createdItem = this.game.createItem(id, name);
    // insert the item into the database
    return createdItem;
  }

  item(id: string): Item {
    return (this.game && this.game.hasItem(id)) ? this.game.items[id].clone() : null;
  }

  get items(): Object {
    return this.game ? this.game.items : {};
  }

  removeItem(id: string): void {
    if (this.game) {
      this.game.removeItem(id);
    }
  }

  actor(id: string): Actor {
    if (id === null || id === undefined || id === '') {
      return null;
    }

    if (id === 'player') {
      return this.player;
    } else {
      return this.npc(id);
    }
  }

  createPlayer(name: string): Player {
    return this.game ? this.game.createPlayer(name) : null;
    // create a savegame?
  }

  get player(): Player {
    return (this.game && this.game.hasPlayer()) ? this.game.player : null;
  }

  createNPC(id: string, name: string): NPC {
    if (!this.game) {
      return null;
    }

    const createdNPC = this.game.createNPC(id, name);
    // insert the npc into the database
    return createdNPC;
  }

  npc(id: string): NPC {
    return (this.game && this.game.hasNPC(id)) ? this.game.npcs[id] : null;
  }

  get npcs(): Object {
    return this.game ? this.game.npcs : {};
  }

  removeNPC(id: string): void {
    if (this.game) {
      this.game.removeNPC(id);
    }
  }

  createQuest(id: string, name: string): Quest {
    if (!this.game) {
      return null;
    }

    const createdQuest = this.game.createQuest(id, name);
    // insert the quest into the database
    return createdQuest;
  }

  quest(id: string): Quest {
    return (this.game && this.game.hasQuest(id)) ? this.game.quests[id] : null;
  }

  get quests(): Object {
    return this.game ? this.game.quests : {};
  }

  removeQuest(id: string): void {
    if (this.game) {
      this.game.removeQuest(id);
    }
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    this.editSubject.next(this.editMode);
  }
}
