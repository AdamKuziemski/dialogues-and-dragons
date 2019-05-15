import { Component, Inject, ViewChild } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSelect } from '@angular/material';

import { Item } from 'app/model/item/item';
import { NPC } from 'app/model/npc/npc';
import { Quest } from 'app/model/quest/quest';

export interface EntityData {
  type: 'item' | 'npc' | 'quest';
  id: string;
  name: string;
}

@Component({
  selector: 'ncv-add-entity',
  templateUrl: './add-entity.component.html',
  styleUrls: ['./add-entity.component.scss']
})
export class AddEntityDialogComponent {
  @ViewChild(MatSelect) typeSelect: MatSelect;

  constructor(
    public dialogRef: MatDialogRef<AddEntityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntityData
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }

  get maximumNameLength(): number {
    return {
      item: Item.maximumNameLength,
      npc: NPC.maximumNameLength,
      quest: Quest.maximumNameLength
    }[this.data.type];
  }
}
