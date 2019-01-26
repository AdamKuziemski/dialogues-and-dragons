import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Action } from '@action/action.interface';
import { actionList } from '@action/action-list';

@Component({
  selector: 'ncv-action-edit',
  templateUrl: './action-edit.component.html',
  styleUrls: ['./action-edit.component.scss']
})
export class ActionEditComponent implements OnInit {
  @Input() action: Action;
  @Output() actionChange: EventEmitter<Action> = new EventEmitter();

  actions = actionList;

  constructor() { }

  ngOnInit() { }

  handleTypeChange(newType: Action): void {
    this.action = this.copyOf(newType);
    this.actionChange.emit(this.action);
  }

  compareActions(a: Action, b: string): boolean {
    return a.name === b;
  }

  private copyOf(actionToCopy: Action): Action {
    const newAction = actionToCopy.clone<Action>();

    newAction.count = this.action.count;
    newAction.targetId = this.action.targetId;
    newAction.value = this.action.value;

    return newAction;
  }
}
