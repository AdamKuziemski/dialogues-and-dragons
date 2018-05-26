import { GameObject } from '../game-object';
import { ConditionDependent } from '../condition/condition-dependent';
import { DialogueTopic } from './dialogue-topic';
import { DialogueLine } from './dialogue-line';

export class Dialogue extends GameObject {
    public greetings: DialogueLine[] = [];
    public topics: DialogueTopic[] = [];
    public isOpen = false;

    private currentLine: DialogueLine = null;
    private currentTopic: DialogueTopic = null;
    private lineIndex = -1;

    constructor() {
        super();
    }

    //#region flow control
    public get backToStart(): boolean {
        return this.isOpen ?
            !this.hasTopic || (this.linesFinished && (this.currentTopic.backToStart || this.topicOptions.length === 0)) :
            true;
    }

    public get goodbye(): boolean {
        return this.isOpen ?
            (this.displayOptions && this.hasTopic && this.currentTopic.goodbye) :
            true;
    }

    public get displayOptions(): boolean {
        return this.isOpen ? (!this.hasTopic || this.linesFinished) : true;
    }

    private get linesFinished(): boolean {
        return this.hasTopic && this.lineIndex >= this.topicLinesCount;
    }

    private get hasTopic(): boolean {
        return this.currentTopic !== null;
    }

    private get topicLinesCount(): number {
        return this.hasTopic ? this.currentTopic.lines.length : 0;
    }

    private get topicOptions(): DialogueTopic[] {
        return this.hasTopic ? this.currentTopic.topics.filter(topic => topic.available) : [];
    }
    //#endregion
    //#region conversation
    public open(): void {
        this.isOpen = true;
        this.reset();
    }

    public get options(): DialogueTopic[] {
        if (!this.isOpen) {
            return [];
        }

        return (this.hasTopic ? this.topicOptions : this.topics.filter(option => option.available));
    }

    public get availableGreetings(): DialogueLine[] {
        return this.greetings.filter(greet => greet.available);
    }

    public get randomGreeting(): DialogueLine {
        const greets = this.availableGreetings;
        if (greets.length === 0) {
            return null;
        }

        const index = this.getRandomInt(greets.length);
        return greets[index];
    }

    public topic(traverse: number[]): DialogueTopic {
        if (!Array.isArray(traverse) || traverse.length < 1 || traverse[0] >= this.topics.length) {
            return null;
        }

        let result = this.topics[traverse[0]];

        for (let i = 1; i < traverse.length; ++i) {
            if (result.topics.length < traverse[i]) {
                return null;
            } else {
                result = result.topics[traverse[i]];
            }
        }

        return result;
    }

    public skipToOptions(): void {
        while (!this.displayOptions) {
            this.advanceLine();
        }
    }

    public advanceLine(): void {
        if (this.currentLine.isGreeting) {
            return;
        }

        ++this.lineIndex;

        if (!this.displayOptions) {
            this.currentLine = this.currentTopic.lines[this.lineIndex];
        } else if (this.goodbye) {
            // temporary - update an observable in the future
            console.log('goodbye');
            // this.isOpen = false;
            this.reset();
        } else if (this.backToStart) {
            this.reset();
        }
    }

    public startTopic(topic: DialogueTopic): void {
        if (!topic) {
            throw Error('Cannot start a topic that is ' + topic);
        }

        this.currentTopic = topic;
        this.lineIndex = 0;

        if (!this.displayOptions) {
            this.currentLine = this.currentTopic.lines[this.lineIndex];
        }
    }

    public reset(): void {
        this.lineIndex = -1;
        this.currentTopic = null;
        this.currentLine = this.randomGreeting;
    }
    //#endregion
    //#region counters
    public get empty(): boolean {
        return this.totalGreetings === 0 && this.topics.length === 0;
    }

    public get length(): number {
        return this.totalTopics + this.getTotalOfChildren(this.topics, elem => elem.length);
    }

    public get totalGreetings(): number {
        return this.greetings.length;
    }

    public get totalTopics(): number {
        return this.topics.length + this.getTotalOfChildren(this.topics, elem => elem.totalTopics);
    }
    //#endregion
    //#region adders/removers
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

    public removeGreeting(index: number): void {
        this.greetings.splice(index, 1);
    }
    //#endregion

    private getRandomInt(max: number): number {
        return Math.floor(Math.random() * Math.floor(max));
    }
}
