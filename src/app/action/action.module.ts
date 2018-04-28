import { NgModule } from '@angular/core';

import { AddItem } from '../model/action/add-item.action';
import { RemoveItem } from '../model/action/remove-item.action';
import { SetQuestStage } from '../model/action/set-quest-stage.action';

import { ActionContainer } from '../model/action/action-container';

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
