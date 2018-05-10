import { Dialogue } from './dialogue';
import { createTestDialogue } from './testing/test-dialogue';

describe('Dialogue - opened', () => {
  const dialogue = createTestDialogue();
  let topic = null;

  dialogue.open();

  const startTopicAndSkip = function(index: number): void {
    topic = dialogue.options[index];
    dialogue.startTopic(topic);
    dialogue.skipToOptions();
  };

  const meetExpectations = function(callNumber: number, shouldDisplay: boolean, optionContainer: any): void {
    expect(dialogue.advanceLine).toHaveBeenCalledTimes(callNumber);
    expect(dialogue.displayOptions).toBe(shouldDisplay);
    expect(dialogue.options).toEqual(optionContainer.topics);
  };

  beforeEach(() => {
    spyOn(dialogue, 'advanceLine').and.callThrough();
  });

  it('should be open', () => expect(dialogue.isOpen).toBe(true));
  it('should not be considered as goodbye', () => expect(dialogue.goodbye).toBe(false));
  it('should be at the beginning', () => expect(dialogue.backToStart).toBe(true));
  it('should be displaying topics', () => expect(dialogue.displayOptions).toBe(true));
  it('should have 3 topics at the start', () => expect(dialogue.options.length).toBe(3));

  it('should click the first option', () => {
    topic = dialogue.topics[0];
    dialogue.startTopic(topic);

    expect(dialogue.displayOptions).toBe(false);
  });

  it('should advance through a line', () => {
    dialogue.advanceLine();

    expect(dialogue.advanceLine).toHaveBeenCalled();
    expect(dialogue.displayOptions).toBe(false);
  });

  it('should advance to the next topic list with 3 topics visible', () => {
    dialogue.skipToOptions();
    meetExpectations(3, true, topic);
  });

  it('should stay the same after trying to advance further', () => {
    dialogue.advanceLine();
    meetExpectations(1, true, topic);
  });

  xit('should click the third option and go back to the name question', () => {
    startTopicAndSkip(2);
    meetExpectations(3, true, topic);
  });

  it('should click the second option from the name question, traverse it and go back to start', () => {
    startTopicAndSkip(1);
    meetExpectations(4, true, dialogue);
  });

  it('should click the second option from the start, traverse it and go back', () => {
    startTopicAndSkip(1);
    meetExpectations(5, true, dialogue);
  });

  it('should click the first option from the start, then the first, and skip to next options', () => {
    startTopicAndSkip(0);
    startTopicAndSkip(0);
    meetExpectations(6, true, topic);
  });
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

  it('should throw an error when trying to start a non-existent topic', () => {
    expect(dialogue.startTopic).toThrowError('Cannot start a topic that is undefined');
    expect(() => dialogue.startTopic(null)).toThrowError('Cannot start a topic that is null');
  });
});
