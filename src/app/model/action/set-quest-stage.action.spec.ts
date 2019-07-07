import { SetQuestStage } from './set-quest-stage.action';

import { Game, GameService, createTestGame } from '@game/testing/test-game';
import { GameObject } from '../game-object';

describe('SetQuestStage', () => {
  let game: Game;
  let service: GameService;

  beforeEach(() => {
    service = new GameService();
    game = createTestGame();
    service.setGame(game);
    GameObject.initializeGameService(service);
  });

  it('should create with default values', () => {
    const action = new SetQuestStage();

    expect(action.questId.value).toBe('');
    expect(action.questId.possibleValues()).toEqual(service.quests);

    expect(action.stage.value).toBe(0);
  });

  it('should result in false when trying to perform with a wrong stage index', () => {
    const action = new SetQuestStage();

    action.questId.value = 'TestQuestCodeception';
    action.stage.value = 666;

    const result = action.perform();
    expect(result.success).toBe(false);
    expect(result.error).toBe(`Trying to set a stage that does not exist`);
  });

  it('should result in false when trying to perform on a non existent quest', () => {
    const action = new SetQuestStage();
    const badQuest = 'HelloIDoNotExist';

    action.questId.value = badQuest;

    const result = action.perform();
    expect(result.success).toBe(false);
    expect(result.error).toBe(`Quest '${badQuest}' doesn't exist`);
  });

  it('should successfully perform with correct parameters', () => {
    const action = new SetQuestStage();
    const target = service.quest('TestQuestCodeception');

    spyOn(target, 'setStage').and.callThrough();

    action.questId.value = 'TestQuestCodeception';
    action.stage.value = 1;

    const result = action.perform();
    expect(result.success).toBe(true);
    expect(target.currentStage).toBe(target.stages[1]);
    expect(target.setStage).toHaveBeenCalled();
  });
});
