import { GameObject } from '../game-object';
import { QuestStage } from './quest-stage';

export class Quest extends GameObject {
  public completed = false;
  public failed = false;

  public stages: QuestStage[] = [];

  private currentStageIndex = -1;

  constructor(public name: string = '', public description: string = '') {
    super();
  }

  public start(): void {
    this.setStage(0);
  }

  public setStage(stage: number): void {
    this.currentStageIndex = stage;
    this.updateFlags();
    this.updateJournal();
  }

  public get currentStage(): QuestStage {
    return (this.isEmpty || !this.started ? new QuestStage() : this.stages[this.currentStageIndex]);
  }

  public get started(): boolean {
    return this.currentStageIndex !== -1;
  }

  public get isEmpty(): boolean {
    return this.stages.length === 0;
  }

  private updateFlags(): void {
    this.completed = this.currentStage.completeQuest;
    this.failed = this.currentStage.failQuest;
  }

  private updateJournal(): void {
    Quest.game.player.addJournalEntry(this.name, this.currentStage.journalEntry);
  }
}
