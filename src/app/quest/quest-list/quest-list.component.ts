import { Component, OnInit } from '@angular/core';

import { GameService } from 'app/model/game/game.service';

import { ResponsiveService } from '@responsive-service';

@Component({
  selector: 'dnd-quest-list',
  styleUrls: ['./quest-list.component.scss'],
  templateUrl: './quest-list.component.html',
})
export class QuestListComponent implements OnInit {
  constructor(
    public game: GameService,
    public responsive: ResponsiveService
  ) { }

  ngOnInit(): void {
  }

  deleteQuest(event: MouseEvent, id: string): void {
    event.stopPropagation();
    this.game.removeQuest(id);
  }
}
