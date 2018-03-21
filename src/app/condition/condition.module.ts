import { NgModule } from '@angular/core';

import { Condition } from './condition.class';
import { ConditionDependent } from './condition-dependent.class';
import { ConditionService } from './condition.service';

@NgModule({
  declarations: [
    Condition,
    ConditionDependent,
    ConditionService
  ],
  imports: [
    Condition,
    ConditionDependent,
    ConditionService
  ],
  providers: [
      ConditionService
  ],
  exports: [
    Condition,
    ConditionDependent,
    ConditionService
  ]
})
export class ConditionModule { }
