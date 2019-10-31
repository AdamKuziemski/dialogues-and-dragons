import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Action } from '@action/action.interface';
import { ActionParameter, parametersOf } from '@action/action-parameter';

import { ResponsiveService } from '@responsive-service';

@Component({
  selector: 'ncv-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  @Input() set action(newAction: Action) {
    this.displayedAction = newAction;
    this.refreshParameters();
  }
  @Output() actionChange: EventEmitter<Action> = new EventEmitter();
  @Output() click: EventEmitter<Action> = new EventEmitter();

  displayedAction: Action;
  target: ActionParameter<any>;
  parameters: ActionParameter<any>[];

  constructor(public responsive: ResponsiveService) { }

  ngOnInit() {}

  handleActionChange(newAction: Action): void {
    this.action = newAction;
    this.actionChange.emit(this.displayedAction);
  }

  handleActionClick(event): void {
    event.stopPropagation();
    this.click.emit(this.displayedAction);
  }

  refreshParameters(): void {
    const allParameters = parametersOf(this.displayedAction).map(entity => entity[1]);
    this.target = allParameters.filter(param => param.isTargetReference)[0];
    this.parameters = allParameters.filter(param => !param.isTargetReference);
  }
}
