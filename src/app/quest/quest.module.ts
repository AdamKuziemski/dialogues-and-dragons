import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { GameService } from '../model/game/game.service';

import { QuestListComponent } from './quest-list/quest-list.component';
import { QuestDetailsComponent } from './quest-details/quest-details.component';

@NgModule({
  declarations: [
    QuestListComponent,
    QuestDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatListModule
  ],
  providers: [
    GameService
  ],
  exports: [
    QuestListComponent
  ]
})
export class QuestModule { }
