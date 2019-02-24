import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Dialogue } from '@dialogue/dialogue';
import { DialogueLine } from '@dialogue/dialogue-line';
import { DialogueTopic } from '@dialogue/dialogue-topic';

import { GameService } from '@game-service';
import { ResponsiveService } from '@responsive-service';

@Component({
  selector: 'ncv-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.scss']
})
export class DialogueComponent implements OnInit, OnDestroy {
  @Input() dialogue: Dialogue;
  @Input() speaker = 'Some NPC';

  @Output() goodbye = new EventEmitter<Dialogue>();

  npcId: string;

  currentTopic: DialogueTopic;
  currentTab = 1;

  private param$: any;

  constructor(
    public game: GameService,
    public responsive: ResponsiveService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.param$ = this.route.paramMap.subscribe(params => {
      this.npcId = params.get('id');
      const npc = this.game.npc(this.npcId);
      if (!npc) {
        return;
      }

      if (npc.dialogue.topics.length === 0) {
        npc.dialogue = Dialogue.exampleDialogue();
      }

      this.speaker = npc.name;
      this.dialogue = npc.dialogue;
      this.currentTopic = this.dialogue.topics[0];
      this.dialogue.reset();
    });
    // this.dialogue.finished.subscribe(status => {});
    this.game.editModeChange.subscribe(() => this.dialogue.open());
  }

  ngOnDestroy(): void {
    this.param$.unsubscribe();
    this.game.npc(this.npcId).dialogue = this.dialogue;
  }

  lineClicked(line: DialogueLine): void {
    this.dialogue.advanceLine();
  }

  topicClicked(topic: DialogueTopic): void {
    this.dialogue.startTopic(topic);
  }

  swipeLeft(): void {
    this.currentTab += 1;
  }

  swipeRight(): void {
    this.currentTab -= 1;
  }

  onTopicClicked(topic: DialogueTopic): void {
    this.currentTopic = topic;
    this.currentTab = 2;
  }
}
