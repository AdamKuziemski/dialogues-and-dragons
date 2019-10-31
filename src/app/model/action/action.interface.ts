import { ActionResult } from './action-result';
import { Cloneable } from '../cloneable.interface';

export { ActionResult } from './action-result';  // convenience

export interface Action extends Cloneable {
  readonly name: string;

  perform(): ActionResult;
}
