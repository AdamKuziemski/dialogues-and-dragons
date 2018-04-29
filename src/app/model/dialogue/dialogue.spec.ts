import { Dialogue } from './dialogue';
import { createTestDialogue } from './testing/test-dialogue';

describe('Dialogue - opened', () => {
  const dialogue = createTestDialogue();
  dialogue.open();

  it('should be open', () => expect(dialogue.isOpen).toBe(true));
  it('should not be considered as goodbye', () => expect(dialogue.goodbye).toBe(false));
  it('should be at the beginning', () => expect(dialogue.backToStart).toBe(true));
  it('should be displaying topics', () => expect(dialogue.displayOptions).toBe(true));
  it('should have 3 topics at the start', () => expect(dialogue.options.length).toBe(3));
});

describe('Dialogue - closed', () => {
  const dialogue = createTestDialogue();

  it('should be closed', () => expect(dialogue.isOpen).toBe(false));
  it('should be considered as goodbye', () => expect(dialogue.goodbye).toBe(true));
});

describe('Dialogue - blank', () => {
  const dialogue = new Dialogue();

  it('should be empty', () => expect(dialogue.empty).toBe(true));
  it('should have length === 0', () => expect(dialogue.length).toBe(0));
  it('should have 0 greetings', () => expect(dialogue.totalGreetings).toBe(0));
  it('should have 0 topics', () => expect(dialogue.totalTopics).toBe(0));
  it('should return an empty options array', () => expect(dialogue.options).toEqual([]));
  it('should return an empty available greetings array', () => expect(dialogue.availableGreetings).toEqual([]));
  it('should return null as a random greeting', () => expect(dialogue.randomGreeting).toBeNull());

  it('should throw an error when trying to advance non-existent line', () => {
    expect(dialogue.advanceLine).toThrowError('Cannot advance from undefined');
    expect(() => dialogue.advanceLine(null)).toThrowError('Cannot advance from null');
  });

  it('should throw an error when trying to start a non-existent topic', () => {
    expect(dialogue.startTopic).toThrowError('Cannot start a topic that is undefined');
    expect(() => dialogue.startTopic(null)).toThrowError('Cannot start a topic that is null');
  });
});
