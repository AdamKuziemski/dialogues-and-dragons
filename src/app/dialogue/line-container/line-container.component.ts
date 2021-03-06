import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DialogueLine } from '@dialogue/dialogue-line';
import { ResponsiveService } from '@responsive-service';

@Component({
  selector: 'ncv-line-container',
  templateUrl: './line-container.component.html',
  styleUrls: ['./line-container.component.scss']
})
export class LineContainerComponent {
  @Input() lines: DialogueLine[];
  @Input() moveLines = false;

  @Output() moveUp: EventEmitter<number> = new EventEmitter();
  @Output() moveDown: EventEmitter<number> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();

  constructor(public responsive: ResponsiveService) { }

  onMoveUp(index: number): void {
    this.moveUp.emit(index);
  }

  onMoveDown(index: number): void {
    this.moveDown.emit(index);
  }

  deleteLine(index: number): void {
    this.delete.emit(index);
  }

  isFirstLine(index: number): boolean {
    return index === 0;
  }

  isLastLine(index: number): boolean {
    return index === this.lines.length - 1;
  }

  canShowDeleteButton(): boolean {
    return this.responsive.isDesktop();
  }

}
