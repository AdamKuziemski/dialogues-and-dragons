import { Game } from './game';

describe('Game - freshly created', () => {
  const game = new Game('Test Game');
  const badIdentifiers = ['test', '', null, undefined];

  it('should have no items at the beginning', () => badIdentifiers.forEach(id => expect(game.hasItem(id)).toBe(false)));
  it('should have no NPCs at the beginning', () => badIdentifiers.forEach(id => expect(game.hasNPC(id)).toBe(false)));
  it(`shouldn't have a player at the beginning`, () => expect(game.hasPlayer()).toBe(false));
});

describe('Game - has content', () => {
  const game = new Game('Test Game');
  game.createItem('DBBladeOfWoe01', 'Blade of Whoa');
  game.createNPC('DBLucienLachance', 'Lucien Lachance');
  game.createPlayer('Hero of Kvatch');

  it('should have an item after adding', () => expect(game.hasItem('DBBladeOfWoe01')).toBe(true));
  it('should have an NPC after adding', () => expect(game.hasNPC('DBLucienLachance')).toBe(true));
  it('should have a player after adding', () => expect(game.hasPlayer()).toBe(true));
});
