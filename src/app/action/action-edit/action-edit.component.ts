import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Action } from '@action/action.interface';
import { actionList } from '@action/action-list';
import { GameService } from '@game-service';
import { ActionParameter, ParameterList, parametersOf } from '@action/action-parameter';

@Component({
  selector: 'ncv-action-edit',
  templateUrl: './action-edit.component.html',
  styleUrls: ['./action-edit.component.scss']
})
export class ActionEditComponent implements OnInit {
  @Input() set action(newAction: Action) {
    this.editedAction = this.copyOf(newAction);
    this.parameters = !!newAction ? parametersOf(this.editedAction) : [];
  }
  @Output() actionChange: EventEmitter<Action> = new EventEmitter();

  actions = actionList;

  editedAction: Action;
  parameters: ParameterList;

  constructor(public game: GameService) { }

  ngOnInit() { }

  handleTypeChange(newType: Action): void {
    this.action = newType;
    this.actionChange.emit(this.editedAction);
  }

  compareActions(a: Action, b: string): boolean {
    return a.name === b;
  }

  private copyOf(actionToCopy: Action): Action {
    const newAction = actionToCopy.clone<Action>();

    parametersOf(actionToCopy).forEach(param => {
      const key = param[0];
      if (newAction.hasOwnProperty(key) && newAction[key].type === actionToCopy[key].type) {
        newAction[key] = actionToCopy[key].clone<ActionParameter<any>>();
      }
    });

    return newAction;
  }
}
