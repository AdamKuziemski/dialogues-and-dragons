import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DialogueModule } from './dialogue/dialogue.module';
import { GameModule } from './game/game.module';
import { HomeModule } from './home/home.module';
import { ItemModule } from './item/item.module';
import { NavbarModule } from './navbar/navbar.module';
import { NpcModule } from './npc/npc.module';
import { QuestModule } from './quest/quest.module';

import { ResponsiveService } from './shared/services/responsive.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    DialogueModule,
    GameModule,
    HomeModule,
    ItemModule,
    NavbarModule,
    NpcModule,
    QuestModule
  ],
  providers: [
    ResponsiveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    if (environment.production) {
      return;
    }

    // Use a custom replacer to display function names in the route configs
    const replacer = (key: string, value: any) => (typeof value === 'function') ? value.name : value;
    console.log('Routes:', JSON.stringify(router.config, replacer, 2));
  }
}
