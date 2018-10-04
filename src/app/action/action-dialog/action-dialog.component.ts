import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Action } from '@action/action.interface';

@Component({
  selector: 'ncv-action-dialog',
  templateUrl: './action-dialog.component.html',
  styleUrls: ['./action-dialog.component.scss']
})
export class ActionDialogComponent {
  public edit: boolean;
  private initialData: Action;

  constructor(
    public dialogRef: MatDialogRef<ActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Action
  ) {
    this.initialData = data.clone<Action>();
    this.dialogRef.beforeClose().subscribe(
        result => result === undefined ? this.onCancel() : this.onSave()
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
