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

    @Output() public dialogueChange = new EventEmitter<Dialogue>();

    private currentLine: DialogueLine;
    private currentTopic: DialogueTopic;
    private options: DialogueTopic[] = [];
    private lineIndex = 0;
    private topicIndex = 0;
    private linesFinished = true;

    private get showTopics(): boolean {
        return this.linesFinished || this.lineIndex >= this.currentTopic.lines.length;
    }

    public lineClicked(line: DialogueLine): void {
        if (line.isGreeting || this.linesFinished) {
            return;
        }

        this.setCurrentLine(++this.lineIndex);
    }

    public topicClicked(topic: DialogueTopic): void {
        if (topic.backToStart) {
            this.reset();
        } else {
            this.currentTopic = topic;
            this.linesFinished = false;
            this.setCurrentLine(0);
        }

    }

    public ngOnInit(): void {
        this.reset();
    }

    private setCurrentLine(index: number): void {
        this.lineIndex = index;
        this.linesFinished = this.showTopics;

        if (!this.linesFinished) {
            this.currentLine = this.currentTopic.lines[index];
        }
    }

    private reset(): void {
        this.options = this.dialogue.topics;
        this.lineIndex = this.topicIndex = 0;
        this.linesFinished = true;
        this.currentLine = this.dialogue.getRandomGreeting();
    }
  }
