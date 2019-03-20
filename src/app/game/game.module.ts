import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import {
  MatButtonModule, MatCardModule, MatDialogModule, MatIconModule,
  MatInputModule, MatSelectModule, MatTabsModule
} from '@angular/material';

import { ItemModule } from '../item/item.module';
import { NpcModule } from '../npc/npc.module';
import { QuestModule } from '../quest/quest.module';

import { GameService } from '../model/game/game.service';

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
