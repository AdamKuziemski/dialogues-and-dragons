import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Action } from '@action/action.interface';
import { actionList } from '@action/action-list';
import { GameService } from '@game-service';
import { ActionParameter } from '@action/action-parameter';

@Component({
  selector: 'ncv-action-edit',
  templateUrl: './action-edit.component.html',
  styleUrls: ['./action-edit.component.scss']
})
export class ActionEditComponent implements OnInit {
  @Input() set action(newAction: Action) {
    this.editedAction = newAction;
    this.parameters = !!newAction ? Object.entries(this.editedAction).filter(entry => entry[1] instanceof ActionParameter) : [];
  }
  @Output() actionChange: EventEmitter<Action> = new EventEmitter();

  actions = actionList;

  editedAction: Action;
  parameters: [string, ActionParameter<any>][];

  constructor(public game: GameService) { }

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

    // newAction.count = this.action.count;
    // newAction.targetId = this.action.targetId;
    // newAction.value = this.action.value;

    return newAction;
  }
}
