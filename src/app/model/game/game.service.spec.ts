import { GameService } from './game.service';
import { Player } from '@player';

describe('GameService', () => {
  const badIdentifiers = ['test', '', null, undefined];

  describe('No game', () => {
    const service = new GameService();

    it('should return null for non-existent item ids', () => badIdentifiers.forEach(id => expect(service.item(id)).toBeNull()));
    it('should return null for non-existent actor ids', () => badIdentifiers.forEach(id => expect(service.actor(id)).toBeNull()));
    it('should return null for non-existent NPC ids', () => badIdentifiers.forEach(id => expect(service.npc(id)).toBeNull()));
    it('should return null for a non-existent player', () => expect(service.player).toBeNull());

    it('should return null when trying to create an item', () => expect(service.createItem('DBBladeOfWoe01', 'Blade of Whoa')).toBeNull());
    it('should return null when trying to create an NPC', () => expect(service.createNPC('DBLucienLachance', 'Lucien Lachance')).toBeNull());
    it('should return null when trying to create a player', () => expect(service.createPlayer('Hero of Kvatch')).toBeNull());
  });

  describe('Empty game', () => {
    let service: GameService;

    beforeEach(() => {
      service = new GameService();
      service.createGame('The Elder Parchments');
    })

    it('should return null for non-existent item ids', () => badIdentifiers.forEach(id => expect(service.item(id)).toBeNull()));
    it('should return null for non-existent actor ids', () => badIdentifiers.forEach(id => expect(service.actor(id)).toBeNull()));
    it('should return null for non-existent NPC ids', () => badIdentifiers.forEach(id => expect(service.npc(id)).toBeNull()));
    it('should return null for a non-existent player', () => expect(service.player).toBeNull());

    it('should return something when trying to create an item', () => {
      expect(service.createItem('DBBladeOfWoe01', 'Blade of Whoa')).toBeTruthy();
    });

    it('should return something when trying to create an NPC', () => {
      expect(service.createNPC('DBLucienLachance', 'Lucien Lachance')).toBeTruthy();
    });

    it('should return something when trying to create a player', () => {
      expect(service.createPlayer('Hero of Kvatch')).toBeTruthy();
    });
  });

  describe('With content', () => {
    let service: GameService;

    beforeEach(() => {
      service = new GameService();
      service.createGame('The Elder Parchments');
      service.createItem('DBBladeOfWoe01', 'Blade of Whoa');
      service.createNPC('DBLucienLachance', 'Lucien Lachance');
      service.createPlayer('Hero of Kvatch');
    });

    it('should have an item', () => expect(service.item('DBBladeOfWoe01')).toBeTruthy());
    it('should have an NPC', () => expect(service.npc('DBLucienLachance')).toBeTruthy());
    it('should have a player', () => expect(service.player).toBeTruthy());

    it('should return actors', () => {
      expect(service.actor(Player.globalId)).toBeTruthy();
      expect(service.actor('DBLucienLachance')).toBeTruthy();
    });
  });

});
