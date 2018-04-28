import { NgModule } from '@angular/core';

import { ConditionDependent } from '../model/condition/condition-dependent';

import { DispositionTowardsPlayer } from '../model/condition/disposition-towards-player.condition';
import { GetItemCount } from '../model/condition/get-item-count.condition';
import { HasItem } from '../model/condition/has-item.condition';
import { QuestStage } from '../model/condition/quest-stage.condition';

@NgModule({
  declarations: [
    ConditionDependent,
    DispositionTowardsPlayer,
    GetItemCount,
    HasItem,
    QuestStage
  ],
  imports: [
    ConditionDependent,
    DispositionTowardsPlayer,
    GetItemCount,
    HasItem,
    QuestStage
  ],
  providers: [ ],
  exports: [
    ConditionDependent,
    DispositionTowardsPlayer,
    GetItemCount,
    HasItem,
    QuestStage
  ]
})
export class ConditionModule { }
