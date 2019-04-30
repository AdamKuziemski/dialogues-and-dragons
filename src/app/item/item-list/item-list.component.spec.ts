import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Predicate } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatCheckboxModule } from '@angular/material';

import { click } from '@testing/click.function';
import { createTestGame } from '@game/testing/test-game';
import { Game } from '@game/game';
import { GameService } from '@game-service';
import { ItemListComponent } from './item-list.component';
import { ResponsiveService } from '@responsive-service';
import { RouterLinkDirectiveStub } from '@testing/router-link-directive-stub';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let testGame: Game;
  let itemCount: number;

  const getElements = (query: Predicate<DebugElement>) => fixture.debugElement.queryAll(query);
  const getLinkElements = () => getElements(By.directive(RouterLinkDirectiveStub));
  const getRouterLinks = () => getLinkElements().map(de => de.injector.get(RouterLinkDirectiveStub));
  const getRandomItem = () => Math.floor(Math.random() * itemCount);
  const getItemIDs = () => Object.keys(testGame.items);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemListComponent,
        RouterLinkDirectiveStub
      ],
      imports: [
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatIconModule,
        MatListModule
      ],
      providers: [
        GameService,
        ResponsiveService
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ItemListComponent);
      component = fixture.componentInstance;
      testGame = createTestGame();
      itemCount = getItemIDs().length;

      component.game.setGame(testGame);
      fixture.detectChanges();
    });
  }));

  it('should create', () => expect(component).toBeTruthy());

  it('should display some items', () => {
    expect(getElements(By.css('mat-list-item')).length).toBe(itemCount, `should have ${itemCount} list items`);
  });

  it('should get RouterLinks from template', () => {
    expect(getRouterLinks().length).toBe(itemCount, `should have ${itemCount} routerLinks`);
  });

  it('should click item links in template', () => {
    const clickedIndex = getRandomItem();
    const item = getLinkElements()[clickedIndex];
    const link = getRouterLinks()[clickedIndex];

    expect(link.navigatedTo).toBeNull('should not have navigated yet');

    click(item);
    fixture.detectChanges();

    expect(link.navigatedTo).toEqual(['/item', link.linkParams[1]], 'should navigate to correct parameters');
  });

  it('should react to adding items', () => {
    component.game.createItem('PonyMadeOfDiamondsCauseYouRich', 'Butt Stallion');
    fixture.detectChanges();
    expect(getElements(By.css('mat-list-item')).length).toBe(itemCount + 1, 'should display one more list item');
  });

  it('should react to removing items', () => {
    const deletedIndex = getRandomItem();
    const button = getElements(By.css('button'))[deletedIndex];

    spyOn(component, 'deleteItem').and.callThrough();
    click(button);

    fixture.detectChanges();

    expect(component.deleteItem).toHaveBeenCalled();
    expect(getItemIDs().length).toBe(itemCount - 1, 'should remove an item from the service');
  });
});
