import { Component, EventEmitter, Input, Output } from '@angular/core';

import { GameService } from '@game-service';

@Component({
  selector: 'dnd-navbar',
  styleUrls: ['./navbar.component.scss'],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input() title: string = '';
  @Output() action: EventEmitter<string> = new EventEmitter();

  constructor(public game: GameService) { }

  toggleEditMode(): void {
    this.game.toggleEditMode();
    this.action.emit(this.game.editMode ? 'edit' : 'play');
  }
}
