import { NgModule } from '@angular/core';

import { AddItem } from './actions/add-item.action';
import { RemoveItem } from './actions/remove-item.action';
import { SetQuestStage } from './actions/set-quest-stage.action';

import { ActionContainer } from './action-container.class';

@NgModule({
  declarations: [
    AddItem,
    RemoveItem,
    SetQuestStage,
    ActionContainer
  ],
  imports: [
    AddItem,
    RemoveItem,
    SetQuestStage,
    ActionContainer
  ],
  providers: [ ],
  exports: [
    AddItem,
    RemoveItem,
    SetQuestStage,
    ActionContainer
  ]
})
export class ActionModule { }
