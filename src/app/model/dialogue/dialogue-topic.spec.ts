import { DialogueTopic, TopicContainer } from './dialogue-topic';

describe('DialogueTopic', () => {
  let topic: DialogueTopic;

  beforeEach(() => {
    topic = new DialogueTopic('Hello');
  });

  it('should be empty right after creation', () => expect(topic.empty).toBe(true));

  it('should have 2 lines', () => {
    topic.lines.add('Are you the Tester?');
    topic.lines.add('I thought you would come sooner or later');
    expect(topic.lineCount).toBe(2);
  });

  it(`should properly count lines (including children's lines)`, () => {
    topic.lines.add('Are you the Tester?');
    topic.lines.add('I thought you would come sooner or later');

    topic.topics.add('Yes, I am.');
    topic.topics.add('Are you?');

    topic.topics.topic(0).lines.add('Whoa! I knew it!');
    topic.topics.topic(1).lines.add(`Do you know something I don't?`);
    expect(topic.lineCount).toBe(4);
  });
});

describe('TopicContainer', () => {
  let container: TopicContainer;

  const fill = () => container.add(
    'Identify items',
    '[Say nothing.]',
    `You'll never take me alive, you robotic sumbitch!`
  );

  beforeEach(() => container = new TopicContainer());

  it('should add single topics', () => {
    expect(container.empty).toBe(true);

    container.add('Hurro');

    expect(container.length).toBe(1);
    expect(container.empty).toBe(false);
  });

  it('should add multiple topics', () => {
    container.add(
      'Identify items',
      '[Say nothing.]',
      `You'll never take me alive, you robotic sumbitch!`
    );

    expect(container.length).toBe(3);
  });

  it(`should properly count topics (including children)`, () => {
    fill();

    container.topic(0).topics.add('Thank you, Deckard.');
    container.topic(0, 0).topics.add(`You've always been a great help.`);
    container.topic(1).topics.add('Please continue Mr. Lachance.');

    expect(container.count).toBe(6);
  });

  it('should access topics via path', () => {
    fill();

    container.topic(0).topics.add('Thank you, Deckard.');
    container.topic(1).topics.add('Please continue Mr. Lachance.').topics.add('Rufio will die by my hand!');

    expect(container.topic(1, 0, 0).label).toBe('Rufio will die by my hand!');

    container.topic(1, 0).topics.add(`But I'm no murderer!`);

    expect(container.topic(1, 0, 1).label).toBe(`But I'm no murderer!`);
  });

  it('should remove topics', () => {
    fill();

    expect(container.remove(1).label).toBe('[Say nothing.]');
    expect(container.length).toBe(2);
  });

  describe('#swap', () => {
    it('should swap topics', () => {
      fill();

      container.swap(0, 1);
      expect(container.topic(0).label).toBe('[Say nothing.]');

      container.swap(0, 2);
      expect(container.topic(0).label).toBe(`You'll never take me alive, you robotic sumbitch!`);
    });

    it('should not swap when one of the indices is not in the topics array', () => {
      const deckardPlease = 'Identify items';

      fill();

      container.swap(0, 42);
      expect(container.topic(0).label).toBe(deckardPlease);

      container.swap(42, 0);
      expect(container.topic(0).label).toBe(deckardPlease);

      container.swap(0, -1);
      expect(container.topic(0).label).toBe(deckardPlease);

      container.swap(-1, 0);
      expect(container.topic(0).label).toBe(deckardPlease);
    });
  });

  it('should clear', () => {
    fill();
    expect(container.empty).toBe(false);
    container.clear();
    expect(container.empty).toBe(true);
  });
});
