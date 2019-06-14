import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
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
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
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
