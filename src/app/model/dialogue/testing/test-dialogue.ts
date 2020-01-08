import { Dialogue } from '../dialogue';

import { AddItem } from '@action/add-item.action';
import { Player } from '@player';

export { Dialogue } from '../dialogue'; // convenience

export function createTestDialogue(): Dialogue {
  const testDialogue = new Dialogue();

  testDialogue.greetings.add(`Hello. I suppose we're going to test some things?`);

  // this topic is used for depth testing
  testDialogue.topics.add('Yes. Yes, we are.');
  testDialogue.topics.topic(0).lines.add(
    'Yay! I love testing!',
    `It's so exciting!`,
    `I'm Karma, by the way.`,
    `What's your name?`
  );

  const potionAction = new AddItem();
  potionAction.targetId.value = Player.globalId;
  potionAction.itemId.value = 'Potion';
  potionAction.count.value = 5;

  testDialogue.topics.topic(0).addAction(potionAction);

  testDialogue.topics.topic(0).topics.add('My name is... (Huh?) My name is... (What?) My name is (chka-chka) Slim Shady.');
  testDialogue.topics.topic(0, 0).lines.add(
    'Nice. Mind if I call you Marshall?',
    'Or do you prefer Rabbit?'
  );

  testDialogue.topics.topic(0, 0).topics.add('Marshall is fine.').goodbye = true;
  testDialogue.topics.topic(0, 0, 0).lines.add(`Great! Let's get to testing then.`);

  testDialogue.topics.topic(0, 0).topics.add(`You're not my friend. You can't call me Rabbit.`);
  testDialogue.topics.topic(0, 0, 1).lines.add(
    `Sorry, I didn't mean to.`,
    `Can we be friends, then?`
  );

  testDialogue.topics.topic(0, 0, 1).topics.add('No. Go away.').goodbye = true;
  testDialogue.topics.topic(0, 0, 1, 0).lines.add(`Sorry again. I better go. You do the testing.`);

  testDialogue.topics.topic(0, 0, 1).topics.add('Uh... Sure.').goodbye = true;
  testDialogue.topics.topic(0, 0, 1, 1).lines.add(`Great! Let's waste no more time and get to testing.`);

  // this nested topic explicitly says to go back to start, after displaying all lines
  testDialogue.topics.topic(0).topics.add(`I won't tell you.`).backToStart = true;
  testDialogue.topics.topic(0, 1).lines.add(
    'This makes me sad.',
    'Like, really sad.',
    `I like to know people's names.`,
    `Let's start over.`
  );

  // this topic should go back to the "What's your name?" question
  testDialogue.topics.topic(0).topics.add('[Say nothing.]');
  testDialogue.topics.topic(0, 2).lines.add(
    `You must've confused me with someone else.`,
    `I'm not from the Dark Brotherhood. This will not work on me.`,
    'Can we start talking now?'
  );

  // this topic should just display all lines and go back to the start
  testDialogue.topics.add(`Sure. And then we're going to test some more things.`);
  testDialogue.topics.topic(1).lines.add(
    `My God, this is too much.`,
    `You're killing me.`,
    `It's like early Christmas...`,
    `Are you sure it's not Christmas?`,
    `Alright, I can't take it anymore. Let's get to testing.`
  );

  // this topic is here for the last case - display all lines and say goodbye
  testDialogue.topics.add(`Aw hell, no. Ain't nobody got time for that!`);
  testDialogue.topics.topic(2).lines.add(
    'But... But... Why?',
    `Don't you like it when you're sure your code works as expected?`,
    'Tell me! Tell me right now!'
  );

  testDialogue.topics.topic(2).topics.add('Testing is tedious work.');
  testDialogue.topics.topic(2, 0).lines.add(
    'But if you do tests, you can detect bugs early on.',
    `And if you're refactoring, you can easily detect if your changes broke something.`
  );
  testDialogue.topics.topic(2, 0).topics.add(`Ah, fair enough. Let's do it, then.`).goodbye = true;

  testDialogue.topics.topic(2).topics.add(`I don't like the idea of writing 50 test cases for a method that does something simple.`);
  testDialogue.topics.topic(2, 1).lines.add(`You mean, you don't like to write additional code to test the one you've already written.`);

  testDialogue.topics.topic(2, 1).topics.add('Pretty much, yeah.').goodbye = true;
  testDialogue.topics.topic(2, 1, 0).lines.add(
    'And yet, here you are.',
    'Thought so.',
    `Now shut up and let's do it.`
  );

  return testDialogue;
}
