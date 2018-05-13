import { Component, EventEmitter, Injectable, Input, Output, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { of as observableOf } from 'rxjs';

import { Dialogue } from '../../model/dialogue/dialogue';
import { DialogueTopic } from '../../model/dialogue/dialogue-topic';

import { ResponsiveService } from '../../shared/services/responsive.service';

@Component({
  selector: 'ncv-dialogue-topic-tree',
  templateUrl: 'dialogue-topic-tree.component.html',
  styleUrls: ['dialogue-topic-tree.component.scss']
})
export class DialogueTopicTreeComponent implements OnInit {
  @Input() dialogue: Dialogue;
  @Output() topicClicked: EventEmitter<DialogueTopic> = new EventEmitter;

  private nestedTreeControl: NestedTreeControl<DialogueTopic>;
  private nestedDataSource: MatTreeNestedDataSource<DialogueTopic>;

  constructor(private responsive: ResponsiveService) {
    this.nestedTreeControl = new NestedTreeControl<DialogueTopic>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
  }

  ngOnInit() {
    this.nestedDataSource.data = this.dialogue.topics;
  }

  private onTopicClicked(topic: DialogueTopic) {
    this.topicClicked.emit(topic);
  }

  private _getChildren = (node: DialogueTopic) => observableOf(node.topics);
  private hasNestedChild = (_: number, node: DialogueTopic) => node.topics.length > 0;
}
