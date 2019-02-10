import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
// import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';

import { ItemModule } from '../item/item.module';
import { NpcModule } from '../npc/npc.module';
import { QuestModule } from '../quest/quest.module';

import { GameService } from '../model/game/game.service';

import { GameComponent } from './game.component';
import { GameDetailsComponent } from './game-details/game-details.component';

@NgModule({
  declarations: [
    GameComponent,
    GameDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    ItemModule,
    NpcModule,
    QuestModule
  ],
  providers: [
    GameService
  ],
  exports: [
    GameComponent,
    GameDetailsComponent
  ]
})
export class GameModule { }
