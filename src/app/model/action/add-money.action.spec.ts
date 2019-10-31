import { AddMoney } from './add-money.action';

import { Game, GameService, createTestGame } from '@game/testing/test-game';
import { GameObject } from '../game-object';
import { Player } from '@player';

describe('AddMoney', () => {
  let game: Game;
  let service: GameService;

  beforeEach(() => {
    service = new GameService();
    game = createTestGame();
    service.setGame(game);
    GameObject.initializeGameService(service);
  });

  it('should create with default values', () => {
    const action = new AddMoney();

    expect(action.targetId.value).toBe(Player.globalId);
    expect(action.targetId.possibleValues()).toEqual(service.actors);

    expect(action.amount.value).toBe(0);
  });

  it('should result in false when trying to perform with a negative amount', () => {
    const action = new AddMoney();

    action.amount.value = -1;

    const result = action.perform();
    expect(result.success).toBe(false);
    expect(result.error).toBe(`Cannot remove money when adding it`);
  });

  it('should result in false when trying to perform on a non existent actor', () => {
    const action = new AddMoney();
    const badActor = 'HelloIDoNotExist';

    action.targetId.value = badActor;

    const result = action.perform();
    expect(result.success).toBe(false);
    expect(result.error).toBe(`Actor '${badActor}' doesn't exist.`);
  });

  it('should successfully perform with correct parameters', () => {
    const action = new AddMoney();
    const target = service.actor(action.targetId.value);
    const initialMoney = target.money;

    spyOn(target, 'addMoney').and.callThrough();

    action.amount.value = 100;

    const result = action.perform();
    expect(result.success).toBe(true);
    expect(target.money).toBe(initialMoney + 100);
    expect(target.addMoney).toHaveBeenCalled();
  });
});
