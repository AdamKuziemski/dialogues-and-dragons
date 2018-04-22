import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DialogueLine } from './dialogue-line.class';

@Component({
    selector: 'ncv-dialogue-line',
    templateUrl: './dialogue-line.component.html',
    styleUrls: ['./dialogue-line.component.scss']
})
export class DialogueLineComponent {
    @Input() public line: DialogueLine;
    @Input() public edit = false;

    @Output() public click = new EventEmitter<DialogueLine>();
    @Output() public lineChange = new EventEmitter<DialogueLine>();

    onClick(event) {
        event.stopPropagation();

        if (!this.edit) {
            this.click.emit(this.line);
        }
    }

    toggleEdit(event) {
        event.stopPropagation();
        this.edit = !this.edit;
    }
}
