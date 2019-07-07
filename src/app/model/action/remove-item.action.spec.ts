import { RemoveItem } from './remove-item.action';

import { createTestGame } from '@game/testing/test-game';
import { Game } from '@game/game';
import { GameObject } from '../game-object';
import { GameService } from '@game/game.service';
import { Player } from '@player';

describe('RemoveItem', () => {
  let game: Game;
  let service: GameService;

  beforeEach(() => {
    service = new GameService();
    game = createTestGame();
    service.setGame(game);
    GameObject.initializeGameService(service);
  });

  it('should create with default values', () => {
    const action = new RemoveItem();

    expect(action.targetId.value).toBe(Player.globalId);
    expect(action.targetId.possibleValues()).toEqual(service.actors);

    expect(action.itemId.value).toBe('');
    expect(action.itemId.possibleValues()).toEqual(service.items);

    expect(action.amount.value).toBe(1);
  });

  it('should result in false when trying to perform on an item the target does not have', () => {
    const action = new RemoveItem();
    const badItem = 'HelloIDoNotExist';

    action.itemId.value = badItem;

    const result = action.perform();
    expect(result.success).toBe(false);
    expect(result.error).toBe(`Cannot remove an item because it's not in the backpack (id: ${badItem})`);
  });

  it('should result in false when trying to perform with a negative count', () => {
    const action = new RemoveItem();
    const target = service.actor(action.targetId.value);
    const item = service.items.keys().next().value;

    target.addItem(item);
    action.itemId.value = item;
    action.amount.value = -1;

    const result = action.perform();
    expect(result.success).toBe(false);
    expect(result.error).toBe(`Cannot add an item by removing a negative value`);
  });

  it('should result in false when trying to perform on a non existent actor', () => {
    const action = new RemoveItem();
    const badActor = 'HelloIDoNotExist';

    action.targetId.value = badActor;

    const result = action.perform();
    expect(result.success).toBe(false);
    expect(result.error).toBe(`Actor '${badActor}' doesn't exist`);
  });

  it('should successfully perform with correct parameters', () => {
    const action = new RemoveItem();
    const target = service.actor(action.targetId.value);
    const item = service.items.keys().next().value;

    spyOn(target, 'removeItem').and.callThrough();

    target.addItem(item);
    action.itemId.value = item;

    const result = action.perform();

    expect(result.success).toBe(true);
    expect(target.hasItem(item)).toBe(false);
    expect(target.removeItem).toHaveBeenCalled();
  });
});
