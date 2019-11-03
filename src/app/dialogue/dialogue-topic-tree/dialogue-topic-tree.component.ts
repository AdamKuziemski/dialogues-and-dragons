import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { of as observableOf } from 'rxjs';

import { Dialogue } from '@dialogue/dialogue';
import { DialogueTopic } from '@dialogue/dialogue-topic';
import { ResponsiveService } from '@responsive-service';

@Component({
  selector: 'ncv-dialogue-topic-tree',
  templateUrl: 'dialogue-topic-tree.component.html',
  styleUrls: ['dialogue-topic-tree.component.scss']
})
export class DialogueTopicTreeComponent implements OnInit {
  @Input() dialogue: Dialogue;
  @Output() topicClicked: EventEmitter<DialogueTopic> = new EventEmitter;

  nestedTreeControl: NestedTreeControl<DialogueTopic>;
  nestedDataSource: MatTreeNestedDataSource<DialogueTopic>;

  shouldOpenNewTopicsOnMobile = false; // this will do for now until we get a settings screen

  constructor(public responsive: ResponsiveService) {
    this.nestedTreeControl = new NestedTreeControl<DialogueTopic>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
  }

  ngOnInit() {
    this.setTreeData(this.dialogue.topics);
  }

  onTopicClicked(topic: DialogueTopic) {
    this.topicClicked.emit(topic);
  }

  hasNestedChild = (_: number, node: DialogueTopic) => node.topics.length > 0;

  addNewItem(node: DialogueTopic) {
    this.clearTree(); // triggers change detection

    node.addTopic('New Topic');

    this.setTreeData(this.dialogue.topics);
    this.nestedTreeControl.expand(node);

    if (this.responsive.isMobile() && this.shouldOpenNewTopicsOnMobile) {
      this.topicClicked.emit(node.lastOf(node.topics));
    }
  }

  private clearTree(): void {
    this.setTreeData([]);
  }

  private setTreeData(data: DialogueTopic[]): void {
    this.nestedDataSource.data = data;
    this.nestedTreeControl.dataNodes = data;
  }

  private _getChildren = (node: DialogueTopic) => observableOf(node.topics);
}
