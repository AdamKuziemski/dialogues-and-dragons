import { GameObject } from '../game-object';
import { QuestStage } from './quest-stage';

export class Quest extends GameObject {
  static readonly maximumNameLength = 50;
  static readonly maximumDescriptionLength = 500;
  
  description = '';

  completed = false;
  failed = false;

  stages: QuestStage[] = [];

  private currentStageIndex = -1;

  constructor(public name: string = '') {
    super();
  }

  start(): void {
    this.setStage(0);
  }

  setStage(stage: number): void {
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
    return this.stages.length === 0;
  }

  addStage(journalEntry: string = ''): QuestStage {
    this.stages.push(new QuestStage(journalEntry));
    return this.lastOf(this.stages);
  }

  removeStage(index: number): void {
    if (index < this.stages.length) {
      this.stages.splice(index, 1);
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
