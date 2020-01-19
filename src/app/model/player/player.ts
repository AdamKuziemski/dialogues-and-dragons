import { Actor } from '../actor/actor';
import { JournalEntry } from '../journal/journal-entry';

import { lastOf } from 'app/shared/functions/last-of.function';

// import { GameService } from '@game-service';

export class Player extends Actor {
  public static readonly globalId: string = 'player';

  journal: JournalEntry[] = [];

  constructor(name: string) {
    super(name);
  }

  addJournalEntry(title: string, entry: string): JournalEntry {
    this.journal.push(new JournalEntry(title, entry));

    return lastOf(this.journal);
  }
}
