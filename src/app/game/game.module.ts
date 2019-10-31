import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

import { ItemModule } from '../item/item.module';
import { NpcModule } from '../npc/npc.module';
import { QuestModule } from '../quest/quest.module';

import { GameService } from '@game-service';

import { GameComponent } from './game.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { AddEntityDialogComponent } from './add-entity/add-entity.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AddEntityDialogComponent,
    GameComponent,
    GameDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    ItemModule,
    NpcModule,
    QuestModule,
    SharedModule
  ],
  providers: [
    GameService
  ],
  entryComponents: [
    AddEntityDialogComponent
  ],
  exports: [
    AddEntityDialogComponent,
    GameComponent,
    GameDetailsComponent
  ]
})
export class GameModule { }
