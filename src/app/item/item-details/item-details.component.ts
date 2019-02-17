import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Item } from 'app/model/item/item';

import { GameService } from '@game-service';
import { ResponsiveService } from '@responsive-service';

type OpenPanel = 'none' | 'description' | 'content' | 'actions';

@Component({
  selector: 'ncv-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
  item: Item;
  currentPanel: OpenPanel = 'none';

  maximumNameLength = 50;
  maximumDescriptionLength = 200;

  private param$: any;

  constructor(
    public game: GameService,
    public responsive: ResponsiveService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.param$ = this.route.paramMap.subscribe(
      (params: ParamMap) => this.item = this.game.item(params.get('id'))
    );
  }

  ngOnDestroy(): void {
    this.param$.unsubscribe();
  }

  //#region description
  get isDescriptionOpen(): boolean {
    return this.currentPanel === 'description';
  }

  openDescriptionPanel(): void {
    this.currentPanel = 'description';
  }
  //#endregion

  //#region content
  get isContentOpen(): boolean {
    return this.currentPanel === 'content';
  }

  openContentPanel(): void {
    this.currentPanel = 'content';
  }

  closeContentPanel(): void {
    if (this.isContentOpen) {
      this.currentPanel = 'none';
    }
  }
  //#endregion

  //#region actions
  get isActionsOpen(): boolean {
    return this.currentPanel === 'actions';
  }

  openActionsPanel(): void {
    this.currentPanel = 'actions';
  }
  //#endregion

}
