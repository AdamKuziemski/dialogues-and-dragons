import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddEntityDialogComponent } from './add-entity/add-entity.component';
import { GameService } from '@game/game.service';

@Component({
  selector: 'ncv-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  currentTab = 0;

  constructor(
    public dialog: MatDialog,
    public game: GameService
  ) { }

  ngOnInit(): void {
  }

  swipeLeft(): void {
    this.currentTab += 1;
  }

  swipeRight(): void {
    this.currentTab -= 1;
  }

  addEntity(): void {
    const dialogRef = this.dialog.open(AddEntityDialogComponent, {
      width: '80%',
      data: { type: this.resolveEntityType(), name: '', id: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
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
