import { Action } from '@action/action.interface';

import { AddItem } from '@action/add-item.action';
import { AddMoney } from '@action/add-money.action';
import { RemoveItem } from '@action/remove-item.action';
import { RemoveMoney } from '@action/remove-money.action';
import { SetQuestStage } from '@action/set-quest-stage.action';

export const actionList: Action[] = [
  new AddItem(),
  new AddMoney(),
  new RemoveItem(),
  new RemoveMoney(),
  new SetQuestStage()
];
