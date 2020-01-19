import { Component, OnInit } from '@angular/core';

import { GameService } from 'app/model/game/game.service';

import { ResponsiveService } from '@responsive-service';

@Component({
  selector: 'dnd-item-list',
  styleUrls: ['./item-list.component.scss'],
  templateUrl: './item-list.component.html',
})
export class ItemListComponent implements OnInit {
  constructor(
    public game: GameService,
    public responsive: ResponsiveService
  ) { }

  ngOnInit(): void {
  }

  deleteItem(event: MouseEvent, itemId: string): void {
    event.stopPropagation();
    this.game.removeItem(itemId);
  }

}
