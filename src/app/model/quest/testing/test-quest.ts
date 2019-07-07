import { Quest } from '../quest';

export { Quest } from '../quest'; // convenience
export { QuestStage } from '../quest-stage'; // convenience

export function createTestQuest(): Quest {
  const testQuest = new Quest('Plumber brothers: Green and Red');

  testQuest.addStage('I heard a rumor that somebody is creating a game editor. I should look for them and see if I can help them.');
  testQuest.addStage('I just heard they live in Lodz. I should head there.');
  testQuest.addStage(
    `I knew these guys were good but I think I insulted them because they didn't let me help. Oh well.`
  ).failQuest = true;
  testQuest.addStage('I helped them write some more unit tests, they looked happy.').completeQuest = true;

  return testQuest;
}
