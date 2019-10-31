import { AddItem } from './add-item.action';

import { Game, GameService, createTestGame } from '@game/testing/test-game';
import { GameObject } from '../game-object';
import { Player } from '@player';

describe('AddItem', () => {
  let game: Game;
  let service: GameService;

  beforeEach(() => {
    service = new GameService();
    game = createTestGame();
    service.setGame(game);
    GameObject.initializeGameService(service);
  });

  it('should create with default values', () => {
    const action = new AddItem();

    expect(action.targetId.value).toBe(Player.globalId);
    expect(action.targetId.possibleValues()).toEqual(service.actors);

    expect(action.itemId.value).toBe('');
    expect(action.itemId.possibleValues()).toEqual(service.items);

    expect(action.count.value).toBe(1);
  });

  it('should result in false when trying to perform on a non existent item', () => {
    const action = new AddItem();
    const badItem = 'HelloIDoNotExist';

    action.itemId.value = badItem;

    const result = action.perform();
    expect(result.success).toBe(false);
    expect(result.error).toBe(`Cannot add an item that does not exist (id: ${badItem})`);
  });

  it('should result in false when trying to perform with a negative count', () => {
    const action = new AddItem();

    action.count.value = -1;

    const result = action.perform();
    expect(result.success).toBe(false);
    expect(result.error).toBe(`Cannot remove an item by adding a negative value`);
  });

  it('should result in false when trying to perform on a non existent actor', () => {
    const action = new AddItem();
    const badActor = 'HelloIDoNotExist';

    action.targetId.value = badActor;

    const result = action.perform();
    expect(result.success).toBe(false);
    expect(result.error).toBe(`Actor '${badActor}' doesn't exist`);
  });

  it('should successfully perform with correct parameters', () => {
    const action = new AddItem();
    const target = service.actor(action.targetId.value);
    const item = service.items.keys().next().value;

    spyOn(target, 'addItem').and.callThrough();

    action.itemId.value = item;

    const result = action.perform();
    expect(result.success).toBe(true);
    expect(target.hasItem(item)).toBe(true);
    expect(target.addItem).toHaveBeenCalled();
  });
});
