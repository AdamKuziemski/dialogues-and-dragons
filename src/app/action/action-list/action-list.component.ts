import { Component, Input, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';

import { ActionContainer } from '@action/action-container';
import { ResponsiveService } from '@responsive-service';

import { ActionDialogComponent } from '../../action/action-dialog/action-dialog.component';
import { Action } from '@action/action.interface';
import { actionList } from '@action/action-list';

@Component({
  selector: 'ncv-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.scss']
})
export class ActionListComponent implements OnInit {
  @Input() actionContainer: ActionContainer;

  moveActions = false;

  constructor(
    public dialog: MatDialog,
    private responsive: ResponsiveService
  ) { }

  ngOnInit() {
  }

  toggleMoveActions(): void {
    this.moveActions = !this.moveActions;
  }

  addAction(): void {
    if (this.responsive.isMobile()) {
      this.openActionDialog(actionList[0].clone<Action>());
    } else {
      this.actionContainer.addAction(actionList[0].clone<Action>());
    }
  }

  handleActionChange(action: Action, index: number): void {
    this.actionContainer.actions[index] = action;
  }

  handleActionClick(action: Action, index: number): void {
    if (this.responsive.isMobile()) {
      this.openActionDialog(action, index);
    }
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
        this.actionContainer.addAction(result);
      } else {
        this.actionContainer.actions[index] = result;
      }
    });
  }

  deleteAction(event: MouseEvent, index: number): void {
    event.stopPropagation();
    this.actionContainer.removeAction(index);
  }

}
