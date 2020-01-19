import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DialogueComponent } from './dialogue/dialogue.component';
import { HomeComponent } from './home/home.component';
import { ItemDetailsComponent } from './item/item-details/item-details.component';
import { NpcDetailsComponent } from './npc/npc-details/npc-details.component';
import { QuestDetailsComponent } from './quest/quest-details/quest-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { environment } from '../environments/environment';

const appRoutes: Routes = [
  {
    component: DialogueComponent,
    path: 'dialogue/:id',
  },
  {
    component: ItemDetailsComponent,
    path: 'item/:id',
  },
  {
    component: NpcDetailsComponent,
    path: 'npc/:id',
  },
  {
    component: QuestDetailsComponent,
    path: 'quest/:id',
  },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: !environment.production
      // preloadingStrategy: SelectivePreloadingStrategyService,
    })
  ],
})
export class AppRoutingModule { }
