import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class DialogueComponent implements OnInit {
  @Input() dialogue: Dialogue;
  @Input() speaker = 'Some NPC';

  @Output() goodbye = new EventEmitter<Dialogue>();

  currentTopic: DialogueTopic;
  currentTab = 1;

  constructor(
    public game: GameService,
    public responsive: ResponsiveService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const npc = this.game.npc(params['id']);
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
