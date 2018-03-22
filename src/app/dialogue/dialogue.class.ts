import { ArrayToolkit } from '../shared/array-toolkit.class';
import { ConditionDependent } from '../condition/condition-dependent.class';
import { DialogueTopic } from './dialogue-topic/dialogue-topic.class';
import { DialogueLine } from './dialogue-line/dialogue-line.class';

export class Dialogue extends ArrayToolkit {
    public greetings: DialogueLine[] = [];
    public topics: DialogueTopic[] = [];

    constructor() {
        super();
        this.reset();
    }

    private currentLine: DialogueLine;
    private currentTopic: DialogueTopic;
    private lineIndex: number;

    public get availableGreetings(): DialogueLine[] {
        return this.greetings.filter(greet => greet.available);
    }

    public get backToStart(): boolean {
        return this.linesFinished && (this.currentTopic.backToStart || this.currentTopic.topics.length === 0);
    }

    public get empty(): boolean {
        return this.totalGreetings === 0 && this.topics.length === 0;
    }

    public get goodbye(): boolean {
        return this.linesFinished && this.currentTopic.goodbye;
    }

    public get length(): number {
        return this.totalTopics + this.getTotalOfChildren(this.topics, elem => elem.length);
    }

    public get linesFinished(): boolean {
        return this.currentTopic === null || this.lineIndex >= this.currentTopic.lines.length;
    }

    public get options(): DialogueTopic[] {
        const futureOptions = (this.currentTopic === null ? this.topics : this.currentTopic.topics);
        return futureOptions.filter(option => option.available);
    }

    public get randomGreeting(): DialogueLine {
        const greets = this.availableGreetings;
        const index = this.getRandomInt(greets.length);
        return this.greetings[index];
    }

    public get totalGreetings(): number {
        return this.greetings.length;
    }

    public get totalTopics(): number {
        return this.topics.length + this.getTotalOfChildren(this.topics, elem => elem.totalTopics);
    }

    public addGreeting(greeting: string): DialogueLine {
        this.greetings.push(new DialogueLine(greeting, true));
        return this.lastOf(this.greetings);
    }

    public addGreetings(greetings: string[]): DialogueLine {
        greetings.forEach(elem => this.addGreeting(elem));
        return this.lastOf(this.greetings);
    }

    public addTopic(label: string): DialogueTopic {
        this.topics.push(new DialogueTopic(label));
        return this.lastOf(this.topics);
    }

    public advanceLine(line: DialogueLine): void {
        if (this.currentLine.isGreeting) {
            return;
        }

        ++this.lineIndex;

        if (this.backToStart) {
            this.reset();
        } else {
            this.setCurrentLine();
        }
    }

    public startTopic(topic: DialogueTopic): void {
        this.currentTopic = topic;
        this.lineIndex = 0;

        this.setCurrentLine();
    }

    private setCurrentLine(): void {
        if (!this.linesFinished) {
            this.currentLine = this.currentTopic.lines[this.lineIndex];
        } else if (this.backToStart) {
            this.reset();
        } else if (this.goodbye) {
            // temporary - update an observable in the future
            console.log('goodbye');
            this.reset();
        }
    }

    public reset(): void {
        this.lineIndex = 0;
        this.currentTopic = null;
        this.currentLine = this.randomGreeting;
    }

    private getRandomInt(max: number): number {
        return Math.floor(Math.random() * Math.floor(max));
    }
}
