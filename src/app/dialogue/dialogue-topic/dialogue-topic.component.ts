import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DialogueTopic } from './dialogue-topic.class';

@Component({
    selector: 'ncv-dialogue-topic',
    templateUrl: './dialogue-topic.component.html',
    styleUrls: ['./dialogue-topic.component.scss']
})
export class DialogueTopicComponent {
    @Input() public topic: DialogueTopic;
    @Input() public edit = false;

    @Output() public click = new EventEmitter<DialogueTopic>();
    @Output() public topicChange = new EventEmitter<DialogueTopic>();

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
}
