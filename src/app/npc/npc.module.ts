import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule,
  MatInputModule, MatListModule, MatSelectModule
} from '@angular/material';

import { GameService } from '../model/game/game.service';

import { NpcDetailsComponent } from './npc-details/npc-details.component';
import { NpcListComponent } from './npc-list/npc-list.component';

@NgModule({
  declarations: [
    NpcDetailsComponent,
    NpcListComponent
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
    NpcDetailsComponent,
    NpcListComponent
  ]
})
export class NpcModule { }
