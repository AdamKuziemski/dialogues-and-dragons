import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Dialogue } from '../model/dialogue/dialogue';
import { DialogueLine } from '../model/dialogue/dialogue-line';
import { DialogueTopic } from '../model/dialogue/dialogue-topic';

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

    public lineClicked(line: DialogueLine): void {
        this.dialogue.advanceLine();
    }

    public topicClicked(topic: DialogueTopic): void {
        this.dialogue.startTopic(topic);
    }

    public ngOnInit(): void {
        this.dialogue.reset();
        // this.dialogue.finished.subscribe(status => {});
    }
  }
