import { ActionContainer } from '../action/action-container';

export class Item extends ActionContainer {
  description = '';
  content = '';
  type = '';
  icon = '';

  isCountable = false;
  isWearable = false;
  isReadable = false;

  count = 0;
  value = 0;
  weight = 0;

  constructor(public name = '') {
    super();
  }
}
