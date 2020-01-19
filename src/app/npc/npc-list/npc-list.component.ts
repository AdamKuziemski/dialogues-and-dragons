import { Component, OnInit } from '@angular/core';

import { GameService } from 'app/model/game/game.service';

import { ResponsiveService } from '@responsive-service';

@Component({
  selector: 'dnd-npc-list',
  styleUrls: ['./npc-list.component.scss'],
  templateUrl: './npc-list.component.html',
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
