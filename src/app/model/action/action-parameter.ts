import lazy from 'lazy-eval';

export class ActionParameter<T> {
  constructor(defaultValue: T) {
    this.value = defaultValue;
  }

  value: T;

  get type(): string { return this.value.constructor.name.toLocaleLowerCase(); }
}

export class PicklistParameter<T> extends ActionParameter<string> {
  constructor(
    defaultValue: string,
    possibleValues: () => Map<string, T>, // needs to be lazy evaluated so it's a function
    labelField: string = 'name'
  ) {
    super(defaultValue);
    this.possibleValues = lazy(possibleValues) || (() => new Map<string, T>());
    this.labelField = labelField;
  }

  possibleValues: () => Map<string, T>;
  labelField: string;

  get type(): string { return 'picklist'; }
}

export class RandomizedParameter extends ActionParameter<number> {
  constructor(defaultValue: number) {
    super(defaultValue);
  }

  minimumValue: number;
  maximumValue: number;
}
