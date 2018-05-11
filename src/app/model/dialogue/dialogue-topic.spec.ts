import { DialogueTopic } from './dialogue-topic';

describe('DialogueTopic', () => {
  const topic = new DialogueTopic('Hello');

  it('should be empty right after creation', () => expect(topic.empty).toBe(true));

  it('should have 2 lines', () => {
    topic.addLine('Are you the Tester?');
    topic.addLine('I thought you would come sooner or later');
    expect(topic.length).toBe(2);
  });

  it('should swap lines successfully', () => {
    topic.swapLines(0, 1);
    expect(topic.lines[0].line).toBe('I thought you would come sooner or later');
    expect(topic.lines[1].line).toBe('Are you the Tester?');
  });

  it('should have 2 child topics', () => {
    topic.addTopic('Yes, I am.');
    topic.addTopic('Are you?');
    expect(topic.totalTopics).toBe(2);
  });

  it(`should have 4 lines (including children's lines)`, () => {
    topic.topics[0].addLine('Whoa! I knew it!');
    topic.topics[1].addLine(`Do you know something I don't?`);
    expect(topic.length).toBe(4);
  });

  it(`should have 4 topics (including children's topics)`, () => {
    topic.topics[0].addTopic('I need you to keep it a secret, though');
    topic.topics[1].addTopic('Maybe.');
    expect(topic.totalTopics).toBe(4);
  });
});
