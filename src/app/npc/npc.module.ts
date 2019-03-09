import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, MatListModule, MatSelectModule } from '@angular/material';

import { GameService } from '../model/game/game.service';

import { NpcListComponent } from './npc-list/npc-list.component';
import { NpcDetailsComponent } from './npc-details/npc-details.component';

@NgModule({
  declarations: [
    NpcListComponent,
    NpcDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule
  ],
  providers: [
    GameService
  ],
  exports: [
    NpcListComponent
  ]
})
export class NpcModule { }
