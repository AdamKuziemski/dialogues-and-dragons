import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';

import { DialogueTopic } from '@dialogue/dialogue-topic';

import { ActionDialogComponent } from '../../action/action-dialog/action-dialog.component';
import { Action } from '@action/action.interface';
import { actionList } from '@action/action-list';

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
  moveActions = false;

  constructor(
    public dialog: MatDialog,
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

  toggleMoveActions(): void {
    this.moveActions = !this.moveActions;
  }

  addAction(): void {
    if (this.responsive.isMobile()) {
      this.openActionDialog(actionList[0].clone<Action>());
    } else {
      this.topic.addAction(actionList[0].clone<Action>());
    }
  }

  handleActionChange(action: Action, index: number): void {
    this.topic.actions[index] = action;
  }

  handleActionClick(action: Action, index: number): void {
    this.openActionDialog(action, index);
  }

  openActionDialog(action: Action, index = -1): void {
    const dialogRef = this.dialog.open(ActionDialogComponent, {
      width: '80%',
      data: action
    });
    dialogRef.componentInstance.edit = (index !== -1);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      if (index === -1) {
        this.topic.addAction(result);
      } else {
        this.topic.actions[index] = result;
      }
    });
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
