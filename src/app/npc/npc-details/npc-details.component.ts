import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { NPC } from '@npc/npc';

import { GameService } from '@game-service';
import { ResponsiveService } from '@responsive-service';
import { DestroyableComponent, untilDestroyed } from 'app/shared/types/destroyable';

@Component({
  selector: 'dnd-npc-details',
  styleUrls: ['./npc-details.component.scss'],
  templateUrl: './npc-details.component.html',
})
export class NpcDetailsComponent extends DestroyableComponent implements OnInit, OnDestroy {
  npc: NPC;
  actorId: string;

  constructor(
    public game: GameService,
    public responsive: ResponsiveService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((params: ParamMap) => {
      this.actorId = params.get('id');
      this.npc = this.game.npc(this.actorId);
    });
  }

  ngOnDestroy(): void {
    this.game.npcs.set(this.actorId, this.npc);
  }

  get maximumNameLength(): number { return NPC.maximumNameLength; }
}
