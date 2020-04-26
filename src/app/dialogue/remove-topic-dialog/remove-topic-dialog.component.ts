import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DialogueTopic } from '@dialogue/dialogue-topic';

export enum Decision {
  RemoveTopic,
  MoveUp,
  Cancel
}

@Component({
  selector: 'dnd-remove-topic-dialog',
  templateUrl: './remove-topic-dialog.component.html',
})
export class RemoveTopicDialogComponent {
  public decision: typeof Decision = Decision;

  constructor(
    public dialogRef: MatDialogRef<RemoveTopicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogueTopic
  ) {}

  public get hasChildren(): boolean {
    return !this.data.empty;
  }

  send(decision: Decision): void {
    this.dialogRef.close(decision);
  }
}
