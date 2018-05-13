import { ConditionDependent } from '../condition/condition-dependent';
import { DialogueLine } from './dialogue-line';

export class DialogueTopic extends ConditionDependent {
    public goodbye = false;
    public backToStart = false;

    public lines: DialogueLine[] = [];
    public topics: DialogueTopic[] = [];

    constructor(public label: string) {
        super();
    }

    get empty(): boolean {
        return this.topics.length === 0 && this.lines.length === 0;
    }

    get length(): number {
        return this.lines.length + this.getTotalOfChildren(this.topics, topic => topic.length);
    }

    get totalTopics(): number {
        return this.topics.length + this.getTotalOfChildren(this.topics, topic => topic.totalTopics);
    }

    public addLine(line: string): DialogueLine {
        this.lines.push(new DialogueLine(line));
        return this.lastOf(this.lines);
    }

    public addTopic(topic: string): DialogueTopic {
        this.topics.push(new DialogueTopic(topic));
        return this.lastOf(this.topics);
    }

    public swapLines(a: number, b: number): void {
        this.lines[a] = this.lines.splice(b, 1, this.lines[a])[0];
    }

    public removeLine(index: number): void {
        this.lines.splice(index, 1);
    }

    // public removeTopic()
}
