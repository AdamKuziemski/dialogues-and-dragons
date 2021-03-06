import { createTestDialogue, Dialogue } from './testing/test-dialogue';
import { DialogueTopic } from './dialogue-topic';

describe('Dialogue', () => {
  describe('Basic functionality', () => {
    let dialogue: Dialogue;

    beforeEach(() => dialogue = createTestDialogue());

    it('should add topics', () => {
      const previousLength = dialogue.topics.length;

      dialogue.addTopic('New Topic');

      expect(dialogue.topics.length).toBe(previousLength + 1);
    });

    it('should add a single greeting', () => {
      const previousLength = dialogue.greetings.length;

      dialogue.addGreeting('New Greeting');

      expect(dialogue.greetings.length).toBe(previousLength + 1);
    });

    it('should add multiple greetings', () => {
      const previousLength = dialogue.greetings.length;

      dialogue.addGreetings([
        'Chicken chaser! Do you chase chickens?',
        'I used to be an adventurer, like you. Then I took an arrow in the knee',
        `You'll never take me alive, you robotic sumbitch!`
      ]);

      expect(dialogue.greetings.length).toBe(previousLength + 3);
    });

    it('should remove topics', () => {
      const previousLength = dialogue.topics.length;

      dialogue.removeTopic(0);

      expect(dialogue.topics.length).toBe(previousLength - 1);
      expect(dialogue.removeTopic(666)).toBeUndefined();
    });

    it('should remove greetings', () => {
      const previousLength = dialogue.greetings.length;

      dialogue.removeGreeting(0);

      expect(dialogue.greetings.length).toBe(previousLength - 1);
      expect(dialogue.removeGreeting(666)).toBeUndefined();
    });
  });

  describe('Opened', () => {
    const dialogue: Dialogue = createTestDialogue();
    let topic: DialogueTopic = null;

    const startTopic = (index: number) => {
      topic = dialogue.options[index];
      dialogue.startTopic(topic);
    };

    const startTopicAndSkip = (index: number) => {
      startTopic(index);
      dialogue.skipToOptions();
    };

    const meetExpectations = (callNumber: number, shouldDisplay: boolean, optionContainer: any) => {
      expect(dialogue.advanceLine).toHaveBeenCalledTimes(callNumber);
      expect(dialogue.displayOptions).toBe(shouldDisplay);
      expect(dialogue.options).toEqual(optionContainer.topics);
    };

    beforeEach(() => {
      spyOn(dialogue, 'advanceLine').and.callThrough();
      dialogue.open();
    });

    it('should be open', () => expect(dialogue.isOpen).toBe(true));
    it('should not be considered as goodbye', () => expect(dialogue.goodbye).toBe(false));
    it('should be at the beginning', () => expect(dialogue.backToStart).toBe(true));
    it('should be displaying topics', () => expect(dialogue.displayOptions).toBe(true));
    it('should have 3 topics at the start', () => expect(dialogue.options.length).toBe(3));
    it('should have 14 total topics', () => expect(dialogue.totalTopics).toBe(14));

    it('should click the first option', () => {
      startTopic(0);
      expect(dialogue.displayOptions).toBe(false);
    });

    it('should advance through a line', () => {
      startTopic(0);
      dialogue.advanceLine();

      expect(dialogue.advanceLine).toHaveBeenCalled();
      expect(dialogue.displayOptions).toBe(false);
    });

    it('should advance to the next topic list with 3 topics visible', () => {
      startTopic(0);
      dialogue.skipToOptions();
      meetExpectations(4, true, topic);
    });

    it('should stay the same after trying to advance further', () => {
      startTopicAndSkip(0);
      dialogue.advanceLine();
      meetExpectations(5, true, topic);
    });

    it('should click the third option and go back to the name question', () => {
      startTopicAndSkip(2);
      meetExpectations(3, true, topic);
    });

    it('should click the second option from the name question, traverse it and go back to start', () => {
      startTopicAndSkip(1);
      meetExpectations(5, true, dialogue);
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

  describe('Closed', () => {
    const dialogue: Dialogue = createTestDialogue();

    it('should be closed', () => expect(dialogue.isOpen).toBe(false));
    it('should be considered as goodbye', () => expect(dialogue.goodbye).toBe(true));
  });

  describe('Blank', () => {
    const dialogue: Dialogue = new Dialogue();

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
});
