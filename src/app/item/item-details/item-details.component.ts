import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Item } from 'app/model/item/item';

import { GameService } from '@game-service';
import { ResponsiveService } from '@responsive-service';

@Component({
  selector: 'ncv-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  item: Item;
  maximumNameLength = 50;

  constructor(
    public game: GameService,
    public responsive: ResponsiveService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => this.item = this.game.item(params.get('id')));
  }

}
