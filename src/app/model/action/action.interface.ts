import { ActionResult } from './action-result';
import { Cloneable } from '../cloneable.interface';

export type ActionValue = string | number | boolean;

export interface Action extends Cloneable {
  readonly name: string;
  readonly hasCount: boolean;
  readonly hasTargetId: boolean;
  readonly hasValue: boolean;

  count: number;
  targetId: string;
  value: ActionValue;

  perform(): ActionResult;

  getTargetIds(): string[];
  getValues(): ActionValue[];
}
