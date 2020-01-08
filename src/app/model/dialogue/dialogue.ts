import { GameObject } from '../game-object';

import { DialogueLine, LineContainer } from './dialogue-line';
import { DialogueTopic, TopicContainer } from './dialogue-topic';

export class Dialogue extends GameObject {
  greetings: LineContainer = new LineContainer();
  topics: TopicContainer = new TopicContainer();
  isOpen: boolean = false;

  currentLine: DialogueLine = null;
  currentTopic: DialogueTopic = null;
  lineIndex: number = -1;

  constructor() {
    super();
  }

  static exampleDialogue(): Dialogue {
    const example: Dialogue = new Dialogue();
    example.greetings.add('Example Greeting');
    example.topics.add('Example Topic');

    return example;
  }

  //#region flow control
  get backToStart(): boolean {
    return this.isOpen ?
      !this.hasTopic || (this.linesFinished && (this.currentTopic.backToStart || this.topicOptions.length === 0)) :
      true;
  }

  get goodbye(): boolean {
    return this.isOpen ?
      (this.displayOptions && this.hasTopic && this.currentTopic.goodbye) :
      true;
  }

  get displayOptions(): boolean {
    return this.isOpen ? (!this.hasTopic || this.linesFinished) : true;
  }

  get linesFinished(): boolean {
    return this.hasTopic && this.lineIndex >= this.topicLinesCount;
  }

  get hasTopic(): boolean {
    return this.currentTopic !== null;
  }

  get topicLinesCount(): number {
    return this.hasTopic ? this.currentTopic.lines.length : 0;
  }

  get topicOptions(): DialogueTopic[] {
    return this.hasTopic ? this.currentTopic.topics.available : [];
  }
  //#endregion

  //#region conversation
  open(): void {
    this.isOpen = true;
    this.reset();
  }

  get options(): DialogueTopic[] {
    if (!this.isOpen) {
      return [];
    }

    return (this.hasTopic ? this.topicOptions : this.topics.available);
  }

  get availableGreetings(): DialogueLine[] {
    return this.greetings.available;
  }

  get randomGreeting(): DialogueLine {
    const greets: DialogueLine[] = this.availableGreetings;
    if (greets.length === 0) {
      return null;
    }

    const index: number = this.getRandomInt(greets.length);

    return greets[index];
  }

  skipToOptions(): void {
    while (!this.displayOptions) {
      this.advanceLine();
    }
  }

  advanceLine(): void {
    if (this.currentLine.isGreeting) {
      return;
    }

    ++this.lineIndex;

    if (!this.displayOptions) {
      this.currentLine = this.currentTopic.lines.lines[this.lineIndex];
    } else if (this.goodbye) {
      // todo update an observable
      // this.isOpen = false;
      this.reset();
    } else if (this.backToStart) {
      this.reset();
    }
  }

  startTopic(topic: DialogueTopic): void {
    if (!topic) {
      throw Error('Cannot start a topic that is ' + topic);
    }

    this.currentTopic = topic;
    this.lineIndex = 0;

    if (!this.displayOptions) {
      this.currentLine = this.currentTopic.lines.lines[this.lineIndex];
    }
  }

  reset(): void {
    this.lineIndex = -1;
    this.currentTopic = null;
    this.currentLine = this.randomGreeting;
  }
  //#endregion

  //#region counters
  get empty(): boolean {
    return this.greetings.length === 0 && this.topics.length === 0;
  }

  get length(): number {
    return this.topics.lines;
  }

  get totalTopics(): number {
    return this.topics.count;
  }
  //#endregion

  addGreetings(greetings: string[]): DialogueLine {
    greetings.forEach((elem: string) => this.greetings.add(elem));

    return this.lastOf(this.greetings.lines);
  }

  // todo: move this to a service that provides more functionality
  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
