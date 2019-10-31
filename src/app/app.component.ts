import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { createTestGame } from './model/game/testing/test-game';

import { GameObject } from './model/game-object';

import { GameService } from './model/game/game.service';
import { ResponsiveService } from './shared/services/responsive.service';

@Component({
  selector: 'ncv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'NPC Conversations';
  edit = true;

  constructor(
    public gameService: GameService,
    public responsive: ResponsiveService
  ) {
    this.responsive.setWidth(window.innerWidth);

    if (this.gameService.getGame('') === null) {
      this.gameService.setGame(createTestGame());
      GameObject.initializeGameService(this.gameService);
    }
  }

  ngOnInit() {

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.responsive.setWidth(event.target.innerWidth);
  }

  handleNavbarAction(action: string): void {
    this.edit = action === 'edit';
  }

  isInternetExploder(): boolean {
    const agent = window.navigator.userAgent;
    return agent.indexOf('MSIE') > -1 || agent.indexOf('Trident') > -1 || agent.indexOf('Edge') > -1;
  }

  isBrowser(): boolean {
    return !this.isInternetExploder();
  }
}
