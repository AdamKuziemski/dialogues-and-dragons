import { RemoveMoney } from './remove-money.action';

import { createTestGame } from '@game/testing/test-game';
import { Game } from '@game/game';
import { GameObject } from '../game-object';
import { GameService } from '@game/game.service';
import { Player } from '@player';

describe('RemoveMoney', () => {
  let game: Game;
  let service: GameService;

  beforeEach(() => {
    service = new GameService();
    game = createTestGame();
    service.setGame(game);
    GameObject.initializeGameService(service);
  });

  it('should create with default values', () => {
    const action = new RemoveMoney();

    expect(action.targetId.value).toBe(Player.globalId);
    expect(action.targetId.possibleValues()).toEqual(service.actors);

    expect(action.amount.value).toBe(0);
  });

  it('should result in false when trying to perform with a negative count', () => {
    const action = new RemoveMoney();

    action.amount.value = -1;

    const result = action.perform();
    expect(result.success).toBe(false);
    expect(result.error).toBe(`Cannot add money by removing a negative value`);
  });

  it('should result in false when trying to perform on a non existent actor', () => {
    const action = new RemoveMoney();
    const badActor = 'HelloIDoNotExist';

    action.targetId.value = badActor;

    const result = action.perform();
    expect(result.success).toBe(false);
    expect(result.error).toBe(`Actor '${badActor}' doesn't exist`);
  });

  it('should successfully perform with correct parameters', () => {
    const action = new RemoveMoney();
    const target = service.actor(action.targetId.value);

    target.addMoney(1000);

    const initialMoney = target.money;

    spyOn(target, 'removeMoney').and.callThrough();

    action.amount.value = 100;

    const result = action.perform();
    expect(result.success).toBe(true);
    expect(target.money).toBe(initialMoney - 100);
    expect(target.removeMoney).toHaveBeenCalled();
  });
});
