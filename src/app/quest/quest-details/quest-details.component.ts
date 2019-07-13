import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Quest } from 'app/model/quest/quest';
import { GameService } from '@game/game.service';
import { ResponsiveService } from '@responsive-service';

@Component({
  selector: 'ncv-quest-details',
  templateUrl: './quest-details.component.html',
  styleUrls: ['./quest-details.component.scss']
})
export class QuestDetailsComponent implements OnDestroy, OnInit {
  quest: Quest;
  questId: string;
  currentStage = -1;

  private param$: any;

  constructor(public game: GameService,
    public responsive: ResponsiveService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.param$ = this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.questId = params.get('id');
        this.quest = this.game.quest(this.questId);
      }
    );
  }

  ngOnDestroy(): void {
    this.param$.unsubscribe();
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
        top: 100,
        behavior: 'smooth'
      });
    });
  }

  get maximumNameLength(): number { return Quest.maximumNameLength; }
  get maximumDescriptionLength(): number { return Quest.maximumDescriptionLength; }

  get hasSubscription(): boolean { return !!this.param$; }

}
