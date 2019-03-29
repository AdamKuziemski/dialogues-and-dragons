import { JournalEntry } from './journal-entry';

describe('JournalEntry', () => {
  it('should create with date.now()', () => {
    let test = new JournalEntry('Hi there', `Just testing. Don't mind me.`);
    expect(test.timestamp).toBe(Date.now());
  });

  it('should create with empty title and description', () => {
    let test = new JournalEntry();
    expect(test.title).toBe('');
    expect(test.entry).toBe('');
  });
});
