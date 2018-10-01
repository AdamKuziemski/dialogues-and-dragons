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
  @Input() public topic: DialogueTopic;
  @Input() public edit = false;

  @Output() public click = new EventEmitter<DialogueTopic>();
  @Output() public topicChange = new EventEmitter<DialogueTopic>();

  private currentPanel: OpenPanel = 'none';
  private maximumLength = 100;
  private moveLines = false;
  private moveActions = false;

  constructor(public dialog: MatDialog, private responsive: ResponsiveService) { }

  ngOnInit() {
    this.closePanels();
  }

  public onClick(event): void {
    event.stopPropagation();

    if (!this.edit) {
      this.click.emit(this.topic);
    }
  }

  public closePanels(): void {
    this.expandPanel('none');
  }

  //#region lines
  public openLinesPanel(): void {
    this.expandPanel('lines');
    this.moveLines = false;
  }

  public get isLinesOpen(): boolean {
    return this.currentPanel === 'lines';
  }

  public addLine(): void {
    this.topic.addLine('');
  }

  public deleteLine(index: number): void {
    this.topic.removeLine(index);
  }

  public toggleMoveLines(): void {
    this.moveLines = !this.moveLines;
  }

  public moveLineDown(index: number): void {
    this.topic.swapLines(index + 1, index);
  }

  public moveLineUp(index: number): void {
    this.topic.swapLines(index - 1, index);
  }
  //#endregion

  //#region actions
  public openActionsPanel(): void {
    this.expandPanel('actions');
  }

  public get isActionsOpen(): boolean {
    return this.currentPanel === 'actions';
  }

  public toggleMoveActions(): void {
    this.moveActions = !this.moveActions;
  }

  public addAction(): void {
    if (this.responsive.isMobile()) {
      this.openActionDialog(actionList[0].clone<Action>());
    } else {
      this.topic.addAction(actionList[0].clone<Action>());
    }
  }

  public handleActionChange(action: Action, index: number): void {
    this.topic.actions[index] = action;
  }

  public handleActionClick(action: Action, index: number): void {
    this.openActionDialog(action, index);
  }

  public openActionDialog(action: Action, index = -1): void {
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
  public openConditionsPanel(): void {
    this.expandPanel('conditions');
  }

  public get isConditionsOpen(): boolean {
    return this.currentPanel === 'conditions';
  }
  //#endregion

  private expandPanel(panel: OpenPanel) {
    if (this.edit) {
      this.currentPanel = panel;
    }
  }
}
