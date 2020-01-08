import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { map } from 'rxjs/operators';

import { Dialogue } from '@dialogue/dialogue';
import { DialogueTopic } from '@dialogue/dialogue-topic';

import { GameService } from '@game-service';
import { NPC } from '@npc/npc';
import { ResponsiveService } from '@responsive-service';

import { Destroyable, untilDestroyed } from 'app/shared/types/destroyable';

@Component({
  selector: 'ncv-dialogue',
  styleUrls: ['./dialogue.component.scss'],
  templateUrl: './dialogue.component.html',
})
export class DialogueComponent extends Destroyable implements OnInit, OnDestroy {
  @Input() dialogue: Dialogue;
  @Input() speaker: string = 'Some NPC';

  @Output() goodbye: EventEmitter<Dialogue> = new EventEmitter<Dialogue>();

  npcId: string;

  currentTopic: DialogueTopic;
  currentTab: number = 1;

  constructor(
    public game: GameService,
    public responsive: ResponsiveService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      untilDestroyed(this),
    ).subscribe((id: string) => {
      this.npcId = id;

      const npc: NPC = this.game.npc(this.npcId);
      if (!npc) {
        return;
      }

      if (npc.dialogue.topics.length === 0) {
        npc.dialogue = Dialogue.exampleDialogue();
      }

      this.speaker = npc.name;
      this.dialogue = npc.dialogue;
      this.currentTopic = this.dialogue.topics.topic(0);
      this.dialogue.reset();
    });

    // this.dialogue.finished.pipe(untilDestroyed(this)).subscribe(status => {});

    this.game.editModeChange.pipe(
      untilDestroyed(this)
    ).subscribe(
      () => this.dialogue.open()
    );
  }

  ngOnDestroy(): void {
    this.game.npc(this.npcId).dialogue = this.dialogue;
  }

  swipeLeft(): void {
    this.currentTab += 1;
  }

  swipeRight(): void {
    this.currentTab -= 1;
  }

  onTopicSelected(path: number[]): void {
    this.currentTopic = this.dialogue.topics.topic(...path);
    this.currentTab = 2;
  }
}
