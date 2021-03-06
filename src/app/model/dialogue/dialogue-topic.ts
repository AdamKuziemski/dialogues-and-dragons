import { ConditionDependent } from '../condition/condition-dependent';

import { DialogueLine } from './dialogue-line';

export class DialogueTopic extends ConditionDependent {
  goodbye: boolean = false;
  backToStart: boolean = false;

  lines: DialogueLine[] = [];
  topics: DialogueTopic[] = [];

  constructor(public label: string) {
    super();
  }

  get empty(): boolean {
    return this.topics.length === 0 && this.lines.length === 0;
  }

  get length(): number {
    return this.topics.reduce((sum: number, topic: DialogueTopic): number => sum + topic.length, this.lines.length);
  }

  get totalTopics(): number {
    return this.topics.reduce((sum: number, topic: DialogueTopic): number => sum + topic.totalTopics, this.topics.length);
  }

  addLine(line: string): DialogueLine {
    this.lines.push(new DialogueLine(line));

    return this.lastOf(this.lines);
  }

  addTopic(topic: string): DialogueTopic {
    this.topics.push(new DialogueTopic(topic));

    return this.lastOf(this.topics);
  }

  swapLines(a: number, b: number): void {
    this.lines[a] = this.lines.splice(b, 1, this.lines[a])[0];
  }

  removeLine(index: number): DialogueLine {
    return this.lines.splice(index, 1)[0];
  }

  removeTopic(index: number): DialogueTopic {
    return this.topics.splice(index, 1)[0];
  }
}
