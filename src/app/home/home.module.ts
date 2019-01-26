import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameModule } from '../game/game.module';

import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    GameModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
