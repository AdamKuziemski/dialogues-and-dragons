import { NgModule } from '@angular/core';

import { ConditionDependent } from './condition-dependent.class';

import { DispositionTowardsPlayer } from './conditions/disposition-towards-player.condition';
import { GetItemCount } from './conditions/get-item-count.condition';
import { HasItem } from './conditions/has-item.condition';
import { QuestStage } from './conditions/quest-stage.condition';

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
