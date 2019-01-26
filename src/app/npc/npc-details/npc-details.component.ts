import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NPC } from 'app/model/npc/npc';

import { GameService } from '@game-service';
import { ResponsiveService } from '@responsive-service';

@Component({
  selector: 'ncv-npc-details',
  templateUrl: './npc-details.component.html',
  styleUrls: ['./npc-details.component.scss']
})
export class NpcDetailsComponent implements OnInit {
  npc: NPC;
  maximumNameLength = 50;
  actorId: string;

  constructor(
    public game: GameService,
    public responsive: ResponsiveService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.actorId = params['id'];
      this.npc = this.game.npc(this.actorId);
    });
  }
}
