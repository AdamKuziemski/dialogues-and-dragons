import { Action } from './action.interface';
import { GameObject } from '../game-object';

import lazy from 'lazy-eval';

export class ActionParameter<T> extends GameObject {
  constructor(
    defaultValue: T,
    public isTargetReference = false
  ) {
    super();
    this.value = defaultValue;
  }

  value: T;

  get type(): string {
    return this.value.constructor.name.toLocaleLowerCase();
  }
}

export class PicklistParameter<T> extends ActionParameter<string> {
  possibleValues: () => Map<string, T>;
  labelField: string;

  constructor(
    defaultValue: string,
    possibleValues: () => Map<string, T>, // needs to be lazily evaluated
    isTargetReference: boolean = false,
    labelField: string = 'name'
  ) {
    super(defaultValue, isTargetReference);
    this.possibleValues = !!possibleValues ? lazy(possibleValues) : lazy(() => new Map<string, T>());
    this.labelField = labelField;
  }

  get type(): string {
    return 'picklist';
  }
}

export type ParameterList = [string, ActionParameter<any>][];

export function parametersOf(source: Action): ParameterList {
  return Object.entries(source).filter(entry => entry[1] instanceof ActionParameter);
}
