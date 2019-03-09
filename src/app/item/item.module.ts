import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  MatButtonModule, MatCardModule,
  MatCheckboxModule, MatExpansionModule,
  MatIconModule, MatInputModule, MatListModule
} from '@angular/material';

import { GameService } from '@game-service';
import { ActionModule } from '../action/action.module';

import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemListComponent } from './item-list/item-list.component';

@NgModule({
  declarations: [
    ItemDetailsComponent,
    ItemListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    ActionModule
  ],
  providers: [
    GameService
  ],
  exports: [
    ItemDetailsComponent,
    ItemListComponent
  ]
})
export class ItemModule { }
