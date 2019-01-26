import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ncv-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  currentTab = 1;

  constructor() { }

  ngOnInit(): void {
  }

  swipeLeft(): void {
    this.currentTab += 1;
  }

  swipeRight(): void {
    this.currentTab -= 1;
  }

}
