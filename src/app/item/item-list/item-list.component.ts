import { Component, OnInit } from '@angular/core';

import { GameService } from 'app/model/game/game.service';

import { ResponsiveService } from '@responsive-service';

@Component({
  selector: 'ncv-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  constructor(
    public game: GameService,
    public responsive: ResponsiveService
  ) { }

  ngOnInit(): void {
  }

}
