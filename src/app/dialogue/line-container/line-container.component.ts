import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { DialogueLine, LineContainer } from '@dialogue/dialogue-line';
import { ResponsiveService } from '@responsive-service';

@Component({
  selector: 'dnd-line-container',
  styleUrls: ['./line-container.component.scss'],
  templateUrl: './line-container.component.html',
})
export class LineContainerComponent {
  @Input() lines: LineContainer;

  @Output() delete: EventEmitter<number> = new EventEmitter();

  constructor(public responsive: ResponsiveService) { }

  deleteLine(index: number): void {
    this.delete.emit(index);
  }

  canShowDeleteButton(): boolean {
    return this.responsive.isDesktop();
  }

  drop(event: CdkDragDrop<DialogueLine[]>): void {
    moveItemInArray(this.lines.lines, event.previousIndex, event.currentIndex);
  }

}
