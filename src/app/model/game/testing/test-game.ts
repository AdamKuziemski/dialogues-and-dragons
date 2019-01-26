import { Game } from '../game';

export function createTestGame(): Game {
  const testGame = new Game('The Elder Parchments CLIX: The Tiny Cave That Was Not There');

  testGame.createPlayer('Majty Uorior');

  testItemTypes.forEach(type => testGame.createItemType(type));

  testGame.createItem('TestItemArchontArmor', 'Archont Armor').type = testItemTypes[0];
  testGame.createItem('TestItemDirtyMagazine', 'Magazine').type = testItemTypes[1];
  testGame.createItem('TestItemPotion', 'Potion').type = testItemTypes[2];
  testGame.createItem('TestItemSuperPotion', 'Super Potion').type = testItemTypes[2];
  testGame.createItem('TestItemUmbra', 'Umbra').type = testItemTypes[3];
  testGame.createItem('TestItemDPUH', 'Double Penetrating Unkempt Harold').type = testItemTypes[3];

  testGame.createNPC('TestNPCGossip', 'Wirt');
  testGame.createNPC('TestNPCEnemy', 'Gary');
  testGame.createNPC('TestNPCMerchant', 'Creeper');
  testGame.createNPC('TestNPCTalker', 'Lucien Lachance');
  testGame.createNPC('TestNPCQuestGiver', 'Craptrap');

  const plumbersQuest = testGame.createQuest('TestQuestPlumberBros', 'Rescue the Princess from Another Castle');
  plumbersQuest.addStage('I just found out that the Princess is in another castle. Gotta go rescue her.');

  return testGame;
}

export const testItemTypes = [
  'TestITArmor',
  'TestITBook',
  'TestITPotion',
  'TestITWeapon'
];
