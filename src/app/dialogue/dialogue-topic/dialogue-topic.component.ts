import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { DialogueTopic } from '@dialogue/dialogue-topic';
import { ResponsiveService } from '@responsive-service';

type OpenPanel = 'none' | 'lines' | 'actions' | 'conditions';

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

    private currentPanel: OpenPanel = 'none';
    private maximumLength = 100;
    private moveLines = false;

    constructor(private responsive: ResponsiveService) {}

    ngOnInit() { }

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

    public addLine(): void {
        this.topic.addLine('');
    }

    public deleteLine(index: number): void {
        this.topic.removeLine(index);
    }

    private get isLinesOpen(): boolean {
        return this.currentPanel === 'lines';
    }

    private get isActionsOpen(): boolean {
        return this.currentPanel === 'actions';
    }

    private get isConditionsOpen(): boolean {
        return this.currentPanel === 'conditions';
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

    private expandPanel(label: OpenPanel) {
        if (this.edit) {
            this.currentPanel = label;
        }
    }
}
