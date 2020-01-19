import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DialogueLine } from '@dialogue/dialogue-line';

@Component({
  selector: 'dnd-dialogue-line',
  styleUrls: ['./dialogue-line.component.scss'],
  templateUrl: './dialogue-line.component.html',
})
export class DialogueLineComponent {
  @Input() line: DialogueLine;
  @Input() edit: boolean = false;

  @Output() click: EventEmitter<DialogueLine> = new EventEmitter<DialogueLine>();
  @Output() lineChange: EventEmitter<DialogueLine> = new EventEmitter<DialogueLine>();

  maximumLength: number = 200;

  onClick(event: MouseEvent): void {
    event.stopPropagation();

    if (!this.edit) {
      this.click.emit(this.line);
    }
  }
}
