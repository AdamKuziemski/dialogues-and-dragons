import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Dialogue } from '../model/dialogue/dialogue';
import { DialogueLine } from '../model/dialogue/dialogue-line';
import { DialogueTopic } from '../model/dialogue/dialogue-topic';
import { ResponsiveService } from '../shared/services/responsive.service';

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

    private onTopicClicked(topic: DialogueTopic): void {
        this.currentTopic = topic;
    }
}
