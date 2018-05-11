import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { DialogueTopic } from '../../model/dialogue/dialogue-topic';

@Component({
    selector: 'ncv-dialogue-topic',
    templateUrl: './dialogue-topic.component.html',
    styleUrls: ['./dialogue-topic.component.scss']
})
export class DialogueTopicComponent implements OnInit {
    @Input() public topic: DialogueTopic;
    @Input() public edit = false;

    @Output() public click = new EventEmitter<DialogueTopic>();
    @Output() public topicChange = new EventEmitter<DialogueTopic>();

    private currentPanel: string;
    private maximumLength = 100;
    private moveLines = false;

    ngOnInit() {
        this.openLinesPanel();
    }

    public onClick(event): void {
        event.stopPropagation();

        if (!this.edit) {
            this.click.emit(this.topic);
        }
    }

    public openLinesPanel(): void {
        this.expandPanel('lines');
        this.moveLines = false;
    }

    public openActionsPanel(): void {
        this.expandPanel('actions');
    }

    public openConditionsPanel(): void {
        this.expandPanel('conditions');
    }

    private addLine(): void {
        this.topic.addLine('');
    }

    private toggleMoveLines(): void {
        this.moveLines = !this.moveLines;
    }

    private moveDown(index: number): void {
        this.topic.swapLines(index + 1, index);
    }

    private moveUp(index: number): void {
        this.topic.swapLines(index - 1, index);
    }

    private isFirstLine(index: number): boolean {
        return index === 0;
    }

    private isLastLine(index: number): boolean {
        return index === this.topic.lines.length - 1;
    }

    private canShowDeleteButton(): boolean {
        return document.documentElement.clientWidth >= 450;
    }

    private expandPanel(label: string) {
        if (this.edit) {
            this.currentPanel = label;
        }
    }
}
