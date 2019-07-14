import { ActionContainer } from '../action/action-container';

export class Item extends ActionContainer {
  static readonly maximumNameLength = 50;
  static readonly maximumDescriptionLength = 200;

  description = '';
  content = '';
  type = '';
  icon = '';

  isStackable = false;
  isWearable = false;
  isReadable = false;

  count = 0;
  value = 0;
  weight = 0;

  constructor(public name = '') {
    super();
  }
}
