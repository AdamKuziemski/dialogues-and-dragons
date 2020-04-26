import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { DialogueTopic } from '@dialogue/dialogue-topic';

import { ActionListComponent } from 'app/action/action-list/action-list.component';
import { ResponsiveService } from '@responsive-service';

type OpenPanel = 'none' | 'lines' | 'actions' | 'conditions';

@Component({
  selector: 'dnd-dialogue-topic',
  styleUrls: ['./dialogue-topic.component.scss'],
  templateUrl: './dialogue-topic.component.html',
})
export class DialogueTopicComponent implements OnInit {
  @Input() topic: DialogueTopic = new DialogueTopic('');
  @Input() edit: boolean = false;

  @Output() click: EventEmitter<DialogueTopic> = new EventEmitter<DialogueTopic>();
  @Output() topicChange: EventEmitter<DialogueTopic> = new EventEmitter<DialogueTopic>();
  @Output() topicRemove: EventEmitter<DialogueTopic> = new EventEmitter<DialogueTopic>();

  @ViewChild('actionList', { static: false }) actionList: ActionListComponent;

  currentPanel: OpenPanel = 'none';
  maximumLength: number = 100;

  constructor(
    public responsive: ResponsiveService
  ) { }

  ngOnInit(): void {
    this.closePanels();
  }

  emitTopicClick(event: MouseEvent): void {
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
  //#endregion

  //#region actions
  openActionsPanel(): void {
    this.expandPanel('actions');
  }

  get isActionsOpen(): boolean {
    return this.currentPanel === 'actions';
  }

  addAction(): void {
    this.actionList.addAction();
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
    this.topicRemove.emit();
  }

  private expandPanel(panel: OpenPanel): void {
    if (this.edit) {
      this.currentPanel = panel;
    }
  }
}
