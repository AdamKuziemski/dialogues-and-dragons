import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Dialogue } from '@dialogue/dialogue';
import { DialogueLine } from '@dialogue/dialogue-line';
import { DialogueTopic } from '@dialogue/dialogue-topic';
import { ResponsiveService } from '@responsive-service';

@Component({
  selector: 'ncv-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.scss']
})
export class DialogueComponent implements OnInit {
  @Input() public dialogue: Dialogue;
  @Input() public edit = false;
  @Input() public speaker = 'Some NPC';

  @Output() public goodbye = new EventEmitter<Dialogue>();

  private currentTopic: DialogueTopic;
  private currentTab = 1;

  constructor(private responsive: ResponsiveService) { }

  public ngOnInit(): void {
    this.currentTopic = this.dialogue.topics[0];
    this.dialogue.reset();
    // this.dialogue.finished.subscribe(status => {});
  }

  public lineClicked(line: DialogueLine): void {
    this.dialogue.advanceLine();
  }

  public topicClicked(topic: DialogueTopic): void {
    this.dialogue.startTopic(topic);
  }

  private swipeLeft(event) {
    this.currentTab += 1;
  }

  private swipeRight(event) {
    this.currentTab -= 1;
  }

  private onTopicClicked(topic: DialogueTopic): void {
    this.currentTopic = topic;
    this.currentTab = 2;
  }
}
