import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatCardModule, MatExpansionModule, MatIconModule, MatInputModule, MatListModule } from '@angular/material';

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
