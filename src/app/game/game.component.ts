import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { GameService } from '@game/game.service';
import { ResponsiveService } from '@responsive-service';

import { Destroyable, untilDestroyed } from 'app/shared/types/destroyable';

import { AddEntityDialogComponent, EntityData } from './add-entity/add-entity.component';

@Component({
  selector: 'dnd-game',
  styleUrls: ['./game.component.scss'],
  templateUrl: './game.component.html',
})
export class GameComponent extends Destroyable {
  currentTab: number = 0;

  constructor(
    public dialog: MatDialog,
    public game: GameService,
    public responsive: ResponsiveService
  ) {
    super();
  }

  swipeLeft(): void {
    this.currentTab += 1;
  }

  swipeRight(): void {
    this.currentTab -= 1;
  }

  addEntity(): void {
    const dialogRef: MatDialogRef<AddEntityDialogComponent> = this.dialog.open(AddEntityDialogComponent, {
      data: { type: this.resolveEntityType(), name: '', id: '' },
      width: (this.responsive.isMobile() ? '80%' : '500px'),
    });

    dialogRef.afterClosed().pipe(untilDestroyed(this)).subscribe((result: EntityData) => {
      if (!result) {
        return;
      }

      if (result.type === 'item') {
        this.game.createItem(result.id, result.name);
      } else if (result.type === 'npc') {
        this.game.createNPC(result.id, result.name);
      } else {
        this.game.createQuest(result.id, result.name);
      }
    });
  }

  resolveEntityType(): string {
    return ['item', 'npc', 'quest', 'item'][this.currentTab];
  }

}
