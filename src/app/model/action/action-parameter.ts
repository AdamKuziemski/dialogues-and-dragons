import { Action } from './action.interface';
import { Cloneable } from '../cloneable.interface';

import lazy from 'lazy-eval';

export class ActionParameter<T> implements Cloneable {
  constructor(defaultValue: T, public isInstanceParam = false) {
    this.value = defaultValue;
  }

  value: T;

  get type(): string {
    return this.value.constructor.name.toLocaleLowerCase();
  }

  clone<S>(): S {
    const otherHalf = new (this.constructor as { new(): S });
    Object.keys(this).forEach(key => otherHalf[key] = this[key]);
    return otherHalf;
  }

  cloneArray<S>(howMany: number): S[] {
    return howMany > 0 ? Array.from({ length: howMany }, () => this.clone<S>()) : [];
  }
}

export class PicklistParameter<T> extends ActionParameter<string> {
  constructor(
    defaultValue: string,
    possibleValues: () => Map<string, T>, // needs to be lazily evaluated
    isInstanceParam = false,
    labelField: string = 'name'
  ) {
    super(defaultValue, isInstanceParam);
    this.possibleValues = !!possibleValues ? lazy(possibleValues) : lazy(() => new Map<string, T>());
    this.labelField = labelField;
  }

  possibleValues: () => Map<string, T>;
  labelField: string;

  get type(): string {
    return 'picklist';
  }
}

export type ParameterList = [string, ActionParameter<any>][];

export function parametersOf(source: Action): ParameterList {
  return Object.entries(source).filter(entry => entry[1] instanceof ActionParameter);
}
