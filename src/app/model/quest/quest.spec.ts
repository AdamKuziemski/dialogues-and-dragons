import { Quest, QuestStage } from './testing/test-quest';

import { GameService, createTestGame } from '../game/testing/test-game';
import { GameObject } from '../game-object';

describe('Quest', () => {
  let quest: Quest;
  let initialStages = 0;
  let service: GameService;

  beforeEach(() => {
    service = new GameService();
    service.setGame(createTestGame());

    quest = service.quest('TestQuestCodeception');
    initialStages = quest.length;

    GameObject.initializeGameService(service);
  });

  it('should not be started right after creation', () => expect(new Quest().started).toBe(false));
  it('should not be completed right after creation', () => expect(new Quest().completed).toBe(false));
  it('should not be failed right after creation', () => expect(new Quest().failed).toBe(false));
  it('should be empty right after creation', () => expect(new Quest().isEmpty).toBe(true));

  it('should not be empty after adding a stage', () => {
    const empty = new Quest();
    empty.addStage();
    expect(empty.isEmpty).toBe(false);
  });

  it('should return an empty stage after creation', () => expect(new Quest().currentStage).toEqual(new QuestStage()));

  it('should add stages', () => {
    quest.addStage('test');
    expect(quest.length).toBe(initialStages + 1);
  });

  it('should remove stages', () => {
    quest.removeStage(0);
    expect(quest.length).toBe(initialStages - 1);
  });

  it('should not remove a non-existent stage', () => {
    expect(() => quest.removeStage(666)).toThrowError('Trying to remove a non-existent stage (666)');
  });

  it('should start correctly', () => {
    quest.start();
    expect(quest.started).toBe(true);
    expect(quest.currentStage).toBe(quest.stages[0]);
  });

  it('should not allow setting a non-existent stage', () => {
    expect(() => quest.setStage(666)).toThrowError('Trying to set a stage that does not exist');
  });

  it(`should update player's journal`, () => {
    expect(service.player.journal.length).toBe(0);
    quest.start();
    quest.setStage(1);
    quest.setStage(2);
    expect(service.player.journal.length).toBe(3);
  });

  it('should fail when a failing stage is set', () => {
    quest.setStage(2);
    expect(quest.failed).toBe(true);
  });

  it('should complete when a complete stage is set', () => {
    quest.setStage(3);
    expect(quest.completed).toBe(true);
  });
});
