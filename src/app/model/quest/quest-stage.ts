import { ActionContainer } from '@action/action-container';

export class QuestStage extends ActionContainer {
  public completeQuest = false;
  public failQuest = false;

  constructor(public journalEntry = '') {
    super();
  }
}
