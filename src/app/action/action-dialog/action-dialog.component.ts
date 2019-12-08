import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Action } from '@action/action.interface';
import { Destroyable, untilDestroyed } from 'app/shared/types/destroyable';

@Component({
  selector: 'ncv-action-dialog',
  styleUrls: ['./action-dialog.component.scss'],
  templateUrl: './action-dialog.component.html',
})
export class ActionDialogComponent extends Destroyable {
  public edit: boolean;
  private initialData: Action;

  constructor(
    public dialogRef: MatDialogRef<ActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Action
  ) {
    super();

    this.initialData = data.clone<Action>();
    this.dialogRef.beforeClosed().pipe(untilDestroyed(this)).subscribe(
      (result: Action) => result === undefined ? this.onCancel() : this.onSave()
    );
  }

  onCancel(): void {
    this.dialogRef.close(this.edit ? this.initialData : undefined);
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }

  handleActionChange(action: Action): void {
    this.data = action;
  }

}
