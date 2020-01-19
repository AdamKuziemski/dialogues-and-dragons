import { ConditionDependent } from '../condition/condition-dependent';

import { lastOf } from '../../shared/functions/last-of.function';

export class DialogueLine extends ConditionDependent {
  constructor(
    public line: string,
    public isGreeting: boolean = false
  ) {
    super();
  }
}

export class LineContainer {
  lines: DialogueLine[] = [];

  get available(): DialogueLine[] {
    return this.lines.filter((line: DialogueLine) => line.available);
  }

  get length(): number {
    return this.lines.length;
  }

  get empty(): boolean {
    return this.length === 0;
  }

  add(...lines: string[]): DialogueLine {
    this.lines.push(...lines.map((line: string) => new DialogueLine(line)));

    return lastOf(this.lines);
  }

  remove(index: number): DialogueLine {
    return this.lines.splice(index, 1)[0];
  }

  swap(a: number, b: number): void {
    if (a >= this.length || b >= this.length || a < 0 || b < 0) {
      return;
    }

    this.lines[a] = this.lines.splice(b, 1, this.lines[a])[0];
  }

  clear(): void {
    this.lines = [];
  }
}
