import { Component, Input } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ActionContainer } from '@action/action-container';
import { actionList } from '@action/action-list';
import { Action } from '@action/action.interface';
import { ResponsiveService } from '@responsive-service';

import { Destroyable, untilDestroyed } from 'app/shared/types/destroyable';

import { ActionDialogComponent } from '../../action/action-dialog/action-dialog.component';

@Component({
  selector: 'dnd-action-list',
  styleUrls: ['./action-list.component.scss'],
  templateUrl: './action-list.component.html',
})
export class ActionListComponent extends Destroyable {
  @Input() actionContainer: ActionContainer;

  constructor(
    public dialog: MatDialog,
    private responsive: ResponsiveService
  ) {
    super();
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

  openActionDialog(action: Action, index: number = -1): void {
    const dialogRef: MatDialogRef<ActionDialogComponent> = this.dialog.open(ActionDialogComponent, {
      data: action,
      width: '80%',
    });
    dialogRef.componentInstance.edit = (index !== -1);

    dialogRef.afterClosed().pipe(untilDestroyed(this)).subscribe((result: Action) => {
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

  drop(event: CdkDragDrop<Action[]>): void {
    moveItemInArray(this.actionContainer.actions, event.previousIndex, event.currentIndex);
  }

}
