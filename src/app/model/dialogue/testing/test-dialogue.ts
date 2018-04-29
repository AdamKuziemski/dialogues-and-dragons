import { Dialogue } from '../dialogue';

export function createTestDialogue(): Dialogue {
  const testDialogue = new Dialogue();

  testDialogue.addGreeting(`Hello. I suppose we're going to test some things?`);

  testDialogue.addTopic('Yes. Yes, we are.');
  testDialogue.topics[0].addLine('Yay! I love tesing!');
  testDialogue.topics[0].addLine(`It's so exciting!`);
  testDialogue.topics[0].addLine(`I'm Karma, by the way.`);
  testDialogue.topics[0].addLine(`What's your name?`);

  testDialogue.topics[0].addTopic('My name is... (Huh?) My name is... (What?) My name is (chka-chka) Slim Shady.');
  testDialogue.topics[0].topics[0].addLine('Nice. Mind if I call you Marshall?');

  testDialogue.addTopic(`Sure. And then we're going to test some more things.`);
  testDialogue.topics[1].addLine(`My God, this is too much.`);
  testDialogue.topics[1].addLine(`You're killing me.`);

  testDialogue.addTopic(`Aw hell, no. Ain't nobody got time for that!`);
  testDialogue.topics[2].addLine('But... But... Why?');
  testDialogue.topics[2].addLine(`Don't you like it when you're sure your code works as expected?`);
  testDialogue.topics[2].addLine('Tell me! Tell me right now!');
  // testDialogue.topics[2].addTopic('');

  return testDialogue;
}
