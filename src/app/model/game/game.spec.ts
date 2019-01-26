import { Game } from './game';

import { createTestGame, testItemTypes } from './testing/test-game';

describe('Game - freshly created', () => {
  const game = new Game('Test Game');
  const badIdentifiers = ['test', '', null, undefined];

  it('should have no items at the beginning', () => badIdentifiers.forEach(id => expect(game.hasItem(id)).toBe(false)));
  it('should have no item types', () => expect(game.itemTypes.length).toBe(0));
  it('should have no NPCs at the beginning', () => badIdentifiers.forEach(id => expect(game.hasNPC(id)).toBe(false)));
  it('should have no quests at the beginning', () => badIdentifiers.forEach(id => expect(game.hasQuest(id)).toBe(false)));
  it(`should not have a player at the beginning`, () => expect(game.hasPlayer()).toBe(false));
});

describe('Game - has content', () => {
  const game = createTestGame();

  it('should have an item', () => expect(game.hasItem('TestItemPotion')).toBe(true));
  it('should have item types', () => expect(game.itemTypes.length).toBe(testItemTypes.length));

  it('should correctly check if it has a type', () => {
    expect(game.hasItemType('TestITPotion')).toBe(true);
    expect(game.hasItemType('HelloThereNonExistentType')).toBe(false);
  });

  it('should not add an existing item type', () => {
    game.createItemType('TestITPotion');
    expect(game.itemTypes.length).toBe(testItemTypes.length);
  });

  it('should have an NPC', () => expect(game.hasNPC('TestNPCGossip')).toBe(true));
  it('should have a player', () => expect(game.hasPlayer()).toBe(true));
});
