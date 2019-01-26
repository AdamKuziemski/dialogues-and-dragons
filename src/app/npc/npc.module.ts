import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

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
