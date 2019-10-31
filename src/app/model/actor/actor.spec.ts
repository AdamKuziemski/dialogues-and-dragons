import { Actor } from './actor';
import { GameService } from '../game/game.service';
import { GameObject } from '../game-object';

describe('Actor', () => {
  const badIdentifiers = ['test', '', null, undefined];
  const bwhoa = 'DBBladeOfWoe01';
  const arrow = 'IronArrow01';
  const usles = 'UselessWasteOfSpace';

  let testActor: Actor;
  let service: GameService;

  beforeEach(() => {
    testActor = new Actor('Lucien Lachance');
    service = new GameService();
    GameObject.initializeGameService(service);

    service.createGame('The Elder Parchments');
    service.createItem(bwhoa, 'Blade of Whoa');
    service.createItem(arrow, 'Iron Arrow').isStackable = true;
    service.createItem(usles, 'Waste Of Space');
  });

  it('should return false when looking for non-existent, null or undefined items',
    () => badIdentifiers.forEach(id => expect(testActor.hasItem(id)).toBe(false))
  );

  it('should return 0 as count for non-existent, null or undefined items',
    () => badIdentifiers.forEach(id => expect(testActor.getItemCount(id)).toBe(0))
  );

  it('should return null when trying to get a non-existent, null or undefined item',
    () => badIdentifiers.forEach(id => expect(testActor.getItem(id)).toBeNull())
  );

  it(`should add items to the actor's backpack`, () => {
    testActor.addItem(bwhoa);
    testActor.addItem(bwhoa);
    testActor.addItem(arrow, 10);
    testActor.addItem(arrow, 5);

    expect(testActor.hasItem(bwhoa)).toBe(true);
    expect(testActor.getItemCount(bwhoa)).toBe(2);
    expect(testActor.getItemCount(arrow)).toBe(15);
  });

  it('should have 1 item in the backpack', () => {
    testActor.addItem(usles);
    expect(testActor.getBackpack().length).toBe(1);
  });

  it('should throw an error when trying to add a non-existent item', () => {
    const badId = 'NonExistentItem';
    expect(() => testActor.addItem(badId)).toThrowError(`Cannot add an item that does not exist (id: ${badId})`);
  });

  it('should throw an error when trying to add a neagtive count of an item', () => {
    expect(() => testActor.addItem(arrow, -10)).toThrowError(`Cannot remove an item by adding a negative value`);
  });

  it(`should remove some items from the actor's backpack`, () => {
    testActor.addItem(bwhoa);
    testActor.addItem(bwhoa);
    testActor.addItem(arrow, 10);

    testActor.removeItem(bwhoa);
    testActor.removeItem(arrow, 5);

    expect(testActor.hasItem(bwhoa)).toBe(true);
    expect(testActor.getItemCount(bwhoa)).toBe(1);
    expect(testActor.getItemCount(arrow)).toBe(5);
  });

  it(`should remove the rest of the items from the actor's backpack`, () => {
    testActor.addItem(arrow, 10);

    testActor.removeItem(arrow, 20);

    expect(testActor.hasItem(arrow)).toBe(false);
    expect(testActor.getItemCount(arrow)).toBe(0);
  });

  it(`should throw an error when trying to remove an item which isn't in the actor's backpack`, () => {
    const badItem = 'NonExistentItem';
    expect(() => testActor.removeItem(badItem)).toThrowError(`Cannot remove an item because it's not in the backpack (id: ${badItem})`);
    expect(testActor.hasItem(badItem)).toBe(false);
  });

  it(`should throw an error when trying to remove an negative amount of an item`, () => {
    testActor.addItem(arrow, 10);
    expect(() => testActor.removeItem(arrow, -10)).toThrowError('Cannot add an item by removing a negative value');
    expect(testActor.getItemCount(arrow)).toBe(10);
  });

  it('should have 0 money', () => expect(testActor.money).toBe(0));

  it('should add 100 money to the actor', () => {
    testActor.addMoney(100);
    expect(testActor.money).toBe(100);
  });

  it('should throw an error when adding negative amounts of money',
    () => expect(() => testActor.addMoney(-100)).toThrowError('Cannot remove money when adding it')
  );

  it('should throw an error when removing negative amounts of money',
    () => expect(() => testActor.removeMoney(-100)).toThrowError('Cannot add money by removing a negative value')
  );

  it('should be accurately checking if the actor has enough money', () => {
    testActor.addMoney(150);

    expect(testActor.hasMoney(10)).toBe(true);
    expect(testActor.hasMoney(100)).toBe(true);
    expect(testActor.hasMoney(200)).toBe(false);
  });

  it('should be properly removing money', () => {
    testActor.addMoney(100);

    testActor.removeMoney(50);
    expect(testActor.money).toBe(50);
  });

  it('should set money to 0 when trying to remove too much', () => {
    testActor.addMoney(200);

    testActor.removeMoney(1000);
    expect(testActor.money).toBe(0);
  });
});
