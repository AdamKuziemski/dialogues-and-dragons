import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { DialogueLine } from '../../model/dialogue/dialogue-line';

@Component({
  selector: 'ncv-dialogue-line-list',
  templateUrl: './dialogue-line-list.component.html',
  styleUrls: ['./dialogue-line-list.component.scss']
})
export class DialogueLineListComponent implements OnInit {
  @Input() public lines: DialogueLine[] = [];
  @Input() public showAdd = true;

  /*@Output() public click = new EventEmitter<DialogueTopic>();
  @Output() public topicChange = new EventEmitter<DialogueTopic>();*/

  ngOnInit() {

  }
}
