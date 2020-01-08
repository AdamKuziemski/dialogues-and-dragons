import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { DialogueTopic } from '@dialogue/dialogue-topic';

import { ResponsiveService } from '@responsive-service';

type OpenPanel = 'none' | 'lines' | 'actions' | 'conditions';

@Component({
  selector: 'ncv-dialogue-topic',
  styleUrls: ['./dialogue-topic.component.scss'],
  templateUrl: './dialogue-topic.component.html',
})
export class DialogueTopicComponent implements OnInit {
  @Input() topic: DialogueTopic = new DialogueTopic('');
  @Input() edit: boolean = false;

  @Output() click: EventEmitter<DialogueTopic> = new EventEmitter<DialogueTopic>();
  @Output() topicChange: EventEmitter<DialogueTopic> = new EventEmitter<DialogueTopic>();
  @Output() topicRemove: EventEmitter<DialogueTopic> = new EventEmitter<DialogueTopic>();

  currentPanel: OpenPanel = 'none';
  maximumLength: number = 100;
  moveLines: boolean = false;

  constructor(
    public responsive: ResponsiveService
  ) { }

  ngOnInit(): void {
    this.closePanels();
  }

  onClick(event: MouseEvent): void {
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
    this.topic.lines.add('');
  }

  deleteLine(index: number): void {
    this.topic.lines.remove(index);
  }

  toggleMoveLines(): void {
    this.moveLines = !this.moveLines;
  }

  moveLineDown(index: number): void {
    this.topic.lines.swap(index + 1, index);
  }

  moveLineUp(index: number): void {
    this.topic.lines.swap(index - 1, index);
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

  removeTopic(): void {

  }

  private expandPanel(panel: OpenPanel): void {
    if (this.edit) {
      this.currentPanel = panel;
    }
  }
}
