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
    this.game.quests[this.questId] = this.quest;
  }

  get maximumNameLength(): number { return Quest.maximumNameLength; }
  get maximumDescriptionLength(): number { return Quest.maximumDescriptionLength; }

}
