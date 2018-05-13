import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { DialogueModule } from './dialogue/dialogue.module';
import { GameModule } from './game/game.module';
import { NavbarModule } from './navbar/navbar.module';

import { ResponsiveService } from './shared/services/responsive.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    DialogueModule,
    GameModule,
    NavbarModule,
  ],
  providers: [
    ResponsiveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
