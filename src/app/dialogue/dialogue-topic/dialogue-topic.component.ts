import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { DialogueTopic } from '@dialogue/dialogue-topic';

import { ResponsiveService } from '@responsive-service';

type OpenPanel = 'none' | 'lines' | 'actions' | 'conditions';

@Component({
  selector: 'ncv-dialogue-topic',
  templateUrl: './dialogue-topic.component.html',
  styleUrls: ['./dialogue-topic.component.scss']
})
export class DialogueTopicComponent implements OnInit {
  @Input() topic: DialogueTopic = new DialogueTopic('');
  @Input() edit = false;

  @Output() click = new EventEmitter<DialogueTopic>();
  @Output() topicChange = new EventEmitter<DialogueTopic>();

  currentPanel: OpenPanel = 'none';
  maximumLength = 100;
  moveLines = false;

  constructor(
    public responsive: ResponsiveService
  ) { }

  ngOnInit() {
    this.closePanels();
  }

  onClick(event): void {
    event.stopPropagation();

    if (!this.edit) {
      this.click.emit(this.topic);
    }
  }

  closePanels(): void {
    this.expandPanel('none');
  }

  //#region lines
  openLinesPanel(): void {
    this.expandPanel('lines');
    this.moveLines = false;
  }

  get isLinesOpen(): boolean {
    return this.currentPanel === 'lines';
  }

  addLine(): void {
    this.topic.addLine('');
  }

  deleteLine(index: number): void {
    this.topic.removeLine(index);
  }

  toggleMoveLines(): void {
    this.moveLines = !this.moveLines;
  }

  moveLineDown(index: number): void {
    this.topic.swapLines(index + 1, index);
  }

  moveLineUp(index: number): void {
    this.topic.swapLines(index - 1, index);
  }
  //#endregion

  //#region actions
  openActionsPanel(): void {
    this.expandPanel('actions');
  }

  get isActionsOpen(): boolean {
    return this.currentPanel === 'actions';
  }
  //#endregion

  //#region conditions
  openConditionsPanel(): void {
    this.expandPanel('conditions');
  }

  get isConditionsOpen(): boolean {
    return this.currentPanel === 'conditions';
  }
  //#endregion

  private expandPanel(panel: OpenPanel) {
    if (this.edit) {
      this.currentPanel = panel;
    }
  }
}
