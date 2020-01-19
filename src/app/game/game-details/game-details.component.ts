import { Component, OnInit } from '@angular/core';

import { Game } from '../../model/game/game';

import { GameService } from '@game-service';
import { ResponsiveService } from '@responsive-service';

@Component({
  selector: 'dnd-game-details',
  styleUrls: ['./game-details.component.scss'],
  templateUrl: './game-details.component.html',
})
export class GameDetailsComponent implements OnInit {
  game: Game;
  maximumLength: number = 100;

  constructor(
    public gameService: GameService,
    public responsive: ResponsiveService
    ) { }

  ngOnInit(): void {
    this.game = this.gameService.getGame('');
  }

}
