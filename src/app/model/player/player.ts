import { Actor } from '../actor/actor';
import { JournalEntry } from '../journal/journal-entry';

// import { GameService } from '@game-service';

export class Player extends Actor {
  journal: JournalEntry[] = [];

  constructor(name: string) {
    super(name);
  }

  addJournalEntry(title: string, entry: string): JournalEntry {
    this.journal.push(new JournalEntry(title, entry));
    return this.lastOf(this.journal);
  }
}
