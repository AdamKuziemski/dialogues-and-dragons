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
  actorId: string;

  private param$: any;

  constructor(
    public game: GameService,
    public responsive: ResponsiveService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.param$ = this.route.paramMap.subscribe(params => {
      this.actorId = params.get('id');
      this.npc = this.game.npc(this.actorId);
    });
  }

  ngOnDestroy(): void {
    this.param$.unsubscribe();
    this.game.npcs[this.actorId] = this.npc;
  }

  get maximumNameLength(): number { return NPC.maximumNameLength; }
}
