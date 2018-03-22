import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Dialogue } from './dialogue.class';
import { DialogueLine } from './dialogue-line/dialogue-line.class';
import { DialogueTopic } from './dialogue-topic/dialogue-topic.class';

@Component({
    selector: 'ncv-dialogue',
    templateUrl: './dialogue.component.html',
    styleUrls: ['./dialogue.component.scss']
  })
  export class DialogueComponent implements OnInit {
    @Input() public dialogue: Dialogue;
    @Input() public edit = false;

    @Output() public goodbye = new EventEmitter<Dialogue>();

    public lineClicked(line: DialogueLine): void {
        this.dialogue.advanceLine(line);
    }

    public topicClicked(topic: DialogueTopic): void {
        this.dialogue.startTopic(topic);
    }

    public ngOnInit(): void {
        this.dialogue.reset();
    }
  }
