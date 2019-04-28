import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Predicate } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatCheckboxModule } from '@angular/material';

import { click } from '@testing/click.function';
import { createTestGame } from '@game/testing/test-game';
import { GameService } from '@game-service';
import { ItemListComponent } from './item-list.component';
import { ResponsiveService } from '@responsive-service';
import { RouterLinkDirectiveStub } from '@testing/router-link-directive-stub';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  const testGame = createTestGame();
  const itemCount = Object.keys(testGame.items).length;

  const elements = (query: Predicate<DebugElement>) => fixture.debugElement.queryAll(query);
  const linkElements = () => elements(By.directive(RouterLinkDirectiveStub));
  const routerLinks = () => linkElements().map(de => de.injector.get(RouterLinkDirectiveStub));
  const randomItem = () => Math.floor(Math.random() * itemCount);

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
      component.game.setGame(testGame);

      fixture.detectChanges();
    });
  }));

  it('should create', () => expect(component).toBeTruthy());

  it('should display some items', () =>
    expect(elements(By.css('mat-list-item')).length).toBe(itemCount)
  );

  it('can get RouterLinks from template', () => {
    expect(routerLinks().length).toBe(itemCount, `should have ${itemCount} routerLinks`);
  });

  it('can click item links in template', () => {
    const clickedIndex = randomItem();
    const item = linkElements()[clickedIndex];
    const link = routerLinks()[clickedIndex];

    expect(link.navigatedTo).toBeNull('should not have navigated yet');

    click(item);
    fixture.detectChanges();

    expect(link.navigatedTo).toEqual(['/item', link.linkParams[1]]);
  });
});
