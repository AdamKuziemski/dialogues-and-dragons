import { Component, EventEmitter, Input, Output } from '@angular/core';

import { GameService } from '@game-service';

@Component({
  selector: 'ncv-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() title = '';
  @Output() action: EventEmitter<string> = new EventEmitter();

  constructor(public game: GameService) { }

  toggleEditMode(): void {
    this.game.toggleEditMode();
    this.action.emit(this.game.editMode ? 'edit' : 'play');
  }
}
