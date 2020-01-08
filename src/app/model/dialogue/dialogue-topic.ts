import { ConditionDependent } from '../condition/condition-dependent';

import { LineContainer } from './dialogue-line';
import { GameObject } from '../game-object';

export class DialogueTopic extends ConditionDependent {
  goodbye: boolean = false;
  backToStart: boolean = false;

  lines: LineContainer = new LineContainer();
  topics: TopicContainer = new TopicContainer();

  constructor(public label: string) {
    super();
  }

  get empty(): boolean {
    return this.topics.empty && this.lines.empty;
  }

  get lineCount(): number {
    return this.topics.lines + this.lines.length;
  }
}

export class TopicContainer extends GameObject {
  topics: DialogueTopic[] = [];

  [Symbol.iterator](): DialogueTopic[] {
    return this.topics;
  }

  /**
   * @returns all topics that are currently available to choose in the dialogue
   */
  get available(): DialogueTopic[] {
    return this.topics.filter((topic: DialogueTopic) => topic.available);
  }

  /**
   * @returns length of topic array
   */
  get length(): number {
    return this.topics.length;
  }

  /**
   * @returns whether the topic array is empty
   */
  get empty(): boolean {
    return this.length === 0;
  }

  /**
   * @returns total topic count (including children)
   */
  get count(): number {
    return this.topics.reduce((sum: number, topic: DialogueTopic) => sum + topic.topics.count, this.length);
  }

  /**
   * @returns total line count (including children)
   */
  get lines(): number {
    return this.topics.reduce((sum: number, topic: DialogueTopic) => sum + topic.lineCount, 0);
  }

  add(...topics: string[]): DialogueTopic {
    this.topics.push(...topics.map((topic: string) => new DialogueTopic(topic)));

    return this.lastOf(this.topics);
  }

  topic(...path: number[]): DialogueTopic {
    if (path.length < 1 || path[0] >= this.topics.length) {
      return null;
    }

    let result: DialogueTopic = this.topics[path[0]];

    for (let i: number = 1; i < path.length; ++i) {
      if (result.topics.length < path[i]) {
        return null;
      } else {
        result = result.topics.topic(path[i]);
      }
    }

    return result;
  }

  remove(index: number): DialogueTopic {
    if (index < 0) {
      return undefined;
    }

    return this.topics.splice(index, 1)[0];
  }

  swap(a: number, b: number): void {
    if (a >= this.length || b >= this.length || a < 0 || b < 0) {
      return;
    }

    this.topics[a] = this.topics.splice(b, 1, this.topics[a])[0];
  }

  clear(): void {
    this.topics = [];
  }
}
