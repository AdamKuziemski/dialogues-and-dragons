import { Dialogue } from '../dialogue';

import { AddItem } from '@action/add-item.action';
import { Player } from '@player';

export { Dialogue } from '../dialogue'; // convenience
export function createTestDialogue(): Dialogue {
  const testDialogue = new Dialogue();

  testDialogue.addGreeting(`Hello. I suppose we're going to test some things?`);

  // this topic is used for depth testing
  testDialogue.addTopic('Yes. Yes, we are.');
  testDialogue.topics[0].addLine('Yay! I love testing!');
  testDialogue.topics[0].addLine(`It's so exciting!`);
  testDialogue.topics[0].addLine(`I'm Karma, by the way.`);
  testDialogue.topics[0].addLine(`What's your name?`);

  const potionAction = new AddItem();
  potionAction.targetId.value = Player.globalId;
  potionAction.itemId.value = 'Potion';
  potionAction.count.value = 5;

  testDialogue.topics[0].addAction(potionAction);

  testDialogue.topics[0].addTopic('My name is... (Huh?) My name is... (What?) My name is (chka-chka) Slim Shady.');
  testDialogue.topic([0, 0]).addLine('Nice. Mind if I call you Marshall?');
  testDialogue.topic([0, 0]).addLine('Or do you prefer Rabbit?');

  testDialogue.topic([0, 0]).addTopic('Marshall is fine.').goodbye = true;
  testDialogue.topic([0, 0, 0]).addLine(`Great! Let's get to testing then.`);

  testDialogue.topic([0, 0]).addTopic(`You're not my friend. You can't call me Rabbit.`);
  testDialogue.topic([0, 0, 1]).addLine(`Sorry, I didn't mean to.`);
  testDialogue.topic([0, 0, 1]).addLine(`Can we be friends, then?`);

  testDialogue.topic([0, 0, 1]).addTopic('No. Go away.').goodbye = true;
  testDialogue.topic([0, 0, 1, 0]).addLine(`Sorry again. I better go. You do the testing.`);

  testDialogue.topic([0, 0, 1]).addTopic('Uh... Sure.').goodbye = true;
  testDialogue.topic([0, 0, 1, 1]).addLine(`Great! Let's waste no more time and get to testing.`);

  // this nested topic explicitly says to go back to start, after displaying all lines
  testDialogue.topics[0].addTopic(`I won't tell you.`).backToStart = true;
  testDialogue.topic([0, 1]).addLine('This makes me sad.');
  testDialogue.topic([0, 1]).addLine('Like, really sad.');
  testDialogue.topic([0, 1]).addLine(`I like to know people's names.`);
  testDialogue.topic([0, 1]).addLine(`Let's start over.`);

  // this topic should go back to the "What's your name?" question
  testDialogue.topics[0].addTopic('[Say nothing.]');
  testDialogue.topic([0, 2]).addLine(`You must've confused me with someone else.`);
  testDialogue.topic([0, 2]).addLine(`I'm not from the Dark Brotherhood. This will not work on me.`);
  testDialogue.topic([0, 2]).addLine('Can we start talking now?');

  // this topic should just display all lines and go back to the start
  testDialogue.addTopic(`Sure. And then we're going to test some more things.`);
  testDialogue.topics[1].addLine(`My God, this is too much.`);
  testDialogue.topics[1].addLine(`You're killing me.`);
  testDialogue.topics[1].addLine(`It's like early Christmas...`);
  testDialogue.topics[1].addLine(`Are you sure it's not Christmas?`);
  testDialogue.topics[1].addLine(`Alright, I can't take it anymore. Let's get to testing.`);

  // this topic is here for the last case - display all lines and say goodbye
  testDialogue.addTopic(`Aw hell, no. Ain't nobody got time for that!`);
  testDialogue.topics[2].addLine('But... But... Why?');
  testDialogue.topics[2].addLine(`Don't you like it when you're sure your code works as expected?`);
  testDialogue.topics[2].addLine('Tell me! Tell me right now!');

  testDialogue.topics[2].addTopic('Testing is tedious work.');
  testDialogue.topic([2, 0]).addLine('But if you do tests, you can detect bugs early on.');
  testDialogue.topic([2, 0]).addLine(`And if you're refactoring, you can easily detect if your changes broke something.`);
  testDialogue.topic([2, 0]).addTopic(`Ah, fair enough. Let's do it, then.`).goodbye = true;

  testDialogue.topics[2].addTopic(`I don't like the idea of writing 50 test cases for a method that does something simple.`);
  testDialogue.topic([2, 1]).addLine(`You mean, you don't like to write additional code to test the one you've already written.`);

  testDialogue.topic([2, 1]).addTopic('Pretty much, yeah.').goodbye = true;
  testDialogue.topic([2, 1, 0]).addLine('And yet, here you are.');
  testDialogue.topic([2, 1, 0]).addLine('Thought so.');
  testDialogue.topic([2, 1, 0]).addLine(`Now shut up and let's do it.`);

  return testDialogue;
}
