import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatCardModule, MatCheckboxModule, MatInputModule, MatListModule } from '@angular/material';

import { GameService } from '@game-service';

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
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatListModule
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
