import { Component, OnInit } from '@angular/core';

import { Game } from '../../model/game/game';

import { GameService } from '@game-service';
import { ResponsiveService } from '@responsive-service';

@Component({
  selector: 'ncv-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  game: Game;
  maximumLength = 100;

  constructor(
    public gameService: GameService,
    public responsive: ResponsiveService
    ) { }

  ngOnInit(): void {
    this.game = this.gameService.getGame('');
  }

}
