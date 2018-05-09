import { Actor } from './actor';
import { GameService } from '../game/game.service';

describe('Actor', () => {
  const testActor = new Actor('Lucien Lachance');
  const badIdentifiers = ['test', '', null, undefined];

  let service: GameService = new GameService;

  beforeEach(() => {
    service = new GameService();
    Actor.initializeGameService(service);
  });

  it('should return false when looking for non-existent, null or undefined items', () => {
    badIdentifiers.forEach(id => expect(testActor.hasItem(id)).toBe(false));
  });

  it('should return 0 as count for non-existent, null or undefined items', () => {
    badIdentifiers.forEach(id => expect(testActor.getItemCount(id)).toBe(0));
  });

  it('should return null when trying to get a non-existent, null or undefined item', () => {
    badIdentifiers.forEach(id => expect(testActor.getItem(id)).toBeNull());
  });
});
