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
    path: 'dialogue/:id',
    component: DialogueComponent,
  },
  {
    path: 'item/:id',
    component: ItemDetailsComponent,
  },
  {
    path: 'npc/:id',
    component: NpcDetailsComponent,
  },
  {
    path: 'quest/:id',
    component: QuestDetailsComponent,
  },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: !environment.production
      // preloadingStrategy: SelectivePreloadingStrategyService,
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
