import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

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
