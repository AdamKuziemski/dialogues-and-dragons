import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Action } from '@action/action.interface';
import { AddItem } from '@action/add-item.action'; // TODO remove when finished testing

import { ResponsiveService } from '@responsive-service';

@Component({
  selector: 'ncv-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  @Input() action: Action;
  @Output() actionChange: EventEmitter<Action> = new EventEmitter();
  @Output() click: EventEmitter<Action> = new EventEmitter();

  constructor(private responsive: ResponsiveService) { }

  ngOnInit() {}

  handleActionChange(newAction: Action): void {
    this.action = newAction;
    this.actionChange.emit(this.action);
  }

  handleActionClick(event): void {
    event.stopPropagation();
    this.click.emit(this.action);
  }
}
