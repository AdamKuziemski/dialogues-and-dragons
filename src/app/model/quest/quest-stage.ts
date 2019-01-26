import { ActionContainer } from '@action/action-container';

export class QuestStage extends ActionContainer {
  completeQuest = false;
  failQuest = false;

  constructor(public journalEntry = '') {
    super();
  }
}
