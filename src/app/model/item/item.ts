import { ActionContainer } from '../action/action-container';

export class Item extends ActionContainer {
  public isCountable = false;
  public count = 0;
  public icon = '';
  public description = '';
  public weight: number;
  public value = 0;

  constructor(public name: string) {
    super();
  }
}
