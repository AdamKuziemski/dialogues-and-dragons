import { ArrayToolkit } from '../shared/array-toolkit.class';
import { ConditionDependent } from '../condition/condition-dependent.class';
import { DialogueTopic } from './dialogue-topic/dialogue-topic.class';
import { DialogueLine } from './dialogue-line/dialogue-line.class';

export class Dialogue extends ArrayToolkit {
    public greetings: DialogueLine[] = [];
    public topics: DialogueTopic[] = [];

    get availableGreetings(): number[] {
        return this.getAvailableItems(this.greetings);
    }

    get availableTopics(): number[] {
        return this.getAvailableItems(this.topics);
    }

    get empty(): boolean {
        return this.totalGreetings === 0 && this.topics.length === 0; // totalTopics would be resource-heavy
    }

    get length(): number {
        return this.totalTopics + this.getTotalOfChildren(this.topics, elem => elem.length);
    }

    get totalGreetings(): number {
        return this.greetings.length;
    }

    get totalTopics(): number {
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

    public getRandomGreeting(): DialogueLine {
        const greets = this.availableGreetings;
        const index = this.getRandomInt(greets.length);
        return this.greetings[greets[index]];
    }

    private getAvailableItems(from: ConditionDependent[]): number[] {
        const indices = [];

        for (let i = 0; i < from.length; ++i) {
            if (from[i].isAvailable()) {
                indices.push(i);
            }
        }

        return indices;
    }

    private getRandomInt(max: number): number {
        return Math.floor(Math.random() * Math.floor(max));
      }
}
