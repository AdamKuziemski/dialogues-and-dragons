import { Component, OnInit } from '@angular/core';

import { GameService } from 'app/model/game/game.service';

import { ResponsiveService } from '@responsive-service';

@Component({
  selector: 'ncv-npc-list',
  templateUrl: './npc-list.component.html',
  styleUrls: ['./npc-list.component.scss']
})
export class NpcListComponent implements OnInit {
  constructor(
    public game: GameService,
    public responsive: ResponsiveService
  ) { }

  ngOnInit(): void {
  }

  deleteNPC(event: MouseEvent, id: string): void {
    event.stopPropagation();
    this.game.removeNPC(id);
  }
}
