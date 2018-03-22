import { ConditionDependent } from '../../condition/condition-dependent.class';
import { DialogueLine } from '../dialogue-line/dialogue-line.class';

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
        return this.topics.length + this.getTotalOfChildren(this.topics, topic => topic.topics.length);
    }

    public addLine(line: string): DialogueLine {
        this.lines.push(new DialogueLine(line));
        return this.lastOf(this.lines);
    }

    public addTopic(topic: string): DialogueTopic {
        this.topics.push(new DialogueTopic(topic));
        return this.lastOf(this.topics);
    }
}
