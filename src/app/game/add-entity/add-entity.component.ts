import { Component, Inject, ViewChild } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';

import { Item } from 'app/model/item/item';
import { NPC } from 'app/model/npc/npc';
import { Quest } from 'app/model/quest/quest';

export interface EntityData {
  type: 'item' | 'npc' | 'quest';
  id: string;
  name: string;
}

@Component({
  selector: 'dnd-add-entity',
  styleUrls: ['./add-entity.component.scss'],
  templateUrl: './add-entity.component.html',
})
export class AddEntityDialogComponent {
  @ViewChild(MatSelect, { static: true }) typeSelect: MatSelect;

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
