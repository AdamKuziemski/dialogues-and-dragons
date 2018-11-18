export class JournalEntry {
  public timestamp: number;

  constructor(public title = '', public entry = '') {
    this.timestamp = Date.now(); // TODO switch to game's internal date/time
  }
}
