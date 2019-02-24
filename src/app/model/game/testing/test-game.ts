import { Game } from '../game';

export function createTestGame(): Game {
  const testGame = new Game('The Elder Parchments CLIX: The Tiny Cave That Was Not There');

  testGame.createPlayer('Majty Uorior');

  testItemTypes.forEach(type => testGame.createItemType(type));

  let archont = testGame.createItem('TestItemArchontArmor', 'Archont Armor');
  archont.type = testItemTypes[0];
  archont.isWearable = true;
  archont.value = 1337;
  archont.weight = 100;

  let magazine = testGame.createItem('TestItemDirtyMagazine', 'Magazine');
  magazine.type = testItemTypes[1];
  magazine.isReadable = true;
  magazine.value = 25;
  magazine.weight = 1;

  let potion = testGame.createItem('TestItemPotion', 'Potion');
  potion.type = testItemTypes[2];
  potion.value = 50;
  potion.weight = 0.5;

  let superPotion = testGame.createItem('TestItemSuperPotion', 'Super Potion');
  superPotion.type = testItemTypes[2];
  superPotion.value = 100;
  superPotion.weight = 0.5;

  let umbra = testGame.createItem('TestItemUmbra', 'Umbra');
  umbra.type = testItemTypes[3];
  umbra.value = 2000;
  umbra.weight = 32;

  let dpuh = testGame.createItem('TestItemDPUH', 'Double Penetrating Unkempt Harold');
  dpuh.type = testItemTypes[3];
  dpuh.value = 617;
  dpuh.weight = 10;

  testGame.createNPC('TestNPCGossip', 'Wirt');
  testGame.createNPC('TestNPCEnemy', 'Gary');

  let creeper = testGame.createNPC('TestNPCMerchant', 'Creeper');
  creeper.isMerchant = true;

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
