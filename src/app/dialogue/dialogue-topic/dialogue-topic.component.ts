import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { DialogueTopic } from '../../model/dialogue/dialogue-topic';

@Component({
    selector: 'ncv-dialogue-topic',
    templateUrl: './dialogue-topic.component.html',
    styleUrls: ['./dialogue-topic.component.scss']
})
export class DialogueTopicComponent implements OnInit {
    @Input() public topic: DialogueTopic;
    @Input() public edit = false;

    @Output() public click = new EventEmitter<DialogueTopic>();
    @Output() public topicChange = new EventEmitter<DialogueTopic>();

    private openPanel: string;

    ngOnInit() {
        this.openLinesPanel();
    }

    onClick(event) {
        event.stopPropagation();

        if (!this.edit) {
            this.click.emit(this.topic);
        }
    }

    toggleEdit(event) {
        event.stopPropagation();
        this.edit = !this.edit;
    }

    openLinesPanel() {
        this.expandPanel('lines');
    }

    openActionsPanel() {
        this.expandPanel('actions');
    }

    openConditionsPanel() {
        this.expandPanel('conditions');
    }

    private expandPanel(label: string) {
        if (this.edit) {
            this.openPanel = label;
        }
    }
}
