import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DialogueLine } from '@dialogue/dialogue-line';

@Component({
  selector: 'ncv-dialogue-line',
  templateUrl: './dialogue-line.component.html',
  styleUrls: ['./dialogue-line.component.scss']
})
export class DialogueLineComponent {
  @Input() line: DialogueLine;
  @Input() edit = false;

  @Output() click = new EventEmitter<DialogueLine>();
  @Output() lineChange = new EventEmitter<DialogueLine>();

  maximumLength = 200;

  onClick(event: any): void {
    event.stopPropagation();

    if (!this.edit) {
      this.click.emit(this.line);
    }
  }
}
