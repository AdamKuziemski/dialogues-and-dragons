import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { GameService } from '@game/game.service';
import { ResponsiveService } from '@responsive-service';

import { Quest } from 'app/model/quest/quest';
import { DestroyableComponent, untilDestroyed } from 'app/shared/types/destroyable';

@Component({
  selector: 'dnd-quest-details',
  styleUrls: ['./quest-details.component.scss'],
  templateUrl: './quest-details.component.html',
})
export class QuestDetailsComponent extends DestroyableComponent implements OnDestroy, OnInit {
  quest: Quest;
  questId: string;
  currentStage: number = -1;

  constructor(public game: GameService,
    public responsive: ResponsiveService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((params: ParamMap) => {
      this.questId = params.get('id');
      this.quest = this.game.quest(this.questId);
    });
  }

  ngOnDestroy(): void {
    this.game.quests.set(this.questId, this.quest);
  }

  isStageOpen(index: number): boolean {
    return this.currentStage === index;
  }

  openStage(index: number): void {
    this.currentStage = index;
  }

  addStage(): void {
    this.quest.addStage('');

    requestAnimationFrame(() => {
      this.currentStage = this.quest.stages.length - 1;

      window.scrollBy({
        behavior: 'smooth',
        top: 100,
      });
    });
  }

  get maximumNameLength(): number { return Quest.maximumNameLength; }
  get maximumDescriptionLength(): number { return Quest.maximumDescriptionLength; }
}
