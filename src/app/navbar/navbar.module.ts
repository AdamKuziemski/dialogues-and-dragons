import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatIconModule, MatToolbarModule } from '@angular/material';

import { NavbarComponent } from './navbar.component';
import { GameService } from '@game-service';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule
  ],
  providers: [
    GameService
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
