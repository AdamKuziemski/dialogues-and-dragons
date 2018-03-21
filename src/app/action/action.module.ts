import { NgModule } from '@angular/core';

import { Action } from './action.class';
import { ActionContainer } from './action-container.class';
import { ActionService } from './action.service';

@NgModule({
  declarations: [
    Action,
    ActionContainer,
    ActionService
  ],
  imports: [
    Action,
    ActionContainer,
    ActionService
  ],
  providers: [
      ActionService
  ],
  exports: [
    Action,
    ActionContainer,
    ActionService
  ]
})
export class ActionModule { }
