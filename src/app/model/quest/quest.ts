import { QuestStage } from './quest-stage';

import { lastOf } from 'app/shared/functions/last-of.function';

import { GameObject } from '../game-object';

export class Quest extends GameObject {
  static readonly maximumNameLength: number = 50;
  static readonly maximumDescriptionLength: number = 500;

  description: string = '';

  completed: boolean = false;
  failed: boolean = false;

  stages: QuestStage[] = [];

  private currentStageIndex: number = -1;

  constructor(public name: string = '') {
    super();
  }

  start(): void {
    this.setStage(0);
  }

  setStage(stage: number): void {
    if (stage >= this.length || stage < 0) {
      throw Error('Trying to set a stage that does not exist');
    }

    this.currentStageIndex = stage;
    this.updateFlags();
    this.updateJournal();
  }

  get currentStage(): QuestStage {
    return (this.isEmpty || !this.started ? new QuestStage() : this.stages[this.currentStageIndex]);
  }

  get started(): boolean {
    return this.currentStageIndex !== -1;
  }

  get isEmpty(): boolean {
    return this.length === 0;
  }

  get length(): number {
    return this.stages.length;
  }

  addStage(journalEntry: string = ''): QuestStage {
    this.stages.push(new QuestStage(journalEntry));

    return lastOf(this.stages);
  }

  removeStage(index: number): void {
    if (index < this.stages.length) {
      this.stages.splice(index, 1);
    } else {
      throw Error(`Trying to remove a non-existent stage (${index})`);
    }
  }

  private updateFlags(): void {
    this.completed = this.currentStage.completeQuest;
    this.failed = this.currentStage.failQuest;
  }

  private updateJournal(): void {
    Quest.game.player.addJournalEntry(this.name, this.currentStage.journalEntry);
  }
}
