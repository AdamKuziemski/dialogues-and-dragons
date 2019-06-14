import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Predicate } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { click } from '@testing/click.function';
import { createTestGame } from '@game/testing/test-game';
import { Game } from '@game/game';
import { GameService } from '@game-service';
import { NpcListComponent } from './npc-list.component';
import { ResponsiveService } from '@responsive-service';
import { RouterLinkDirectiveStub } from 'app/shared/testing/router-link-directive-stub';

describe('NpcListComponent', () => {
  let component: NpcListComponent;
  let fixture: ComponentFixture<NpcListComponent>;
  let testGame: Game;
  let npcCount: number;

  const getElements = (query: Predicate<DebugElement>) => fixture.debugElement.queryAll(query);
  const getLinkElements = () => getElements(By.directive(RouterLinkDirectiveStub));
  const getRouterLinks = () => getLinkElements().map(de => de.injector.get(RouterLinkDirectiveStub));
  const getRandomNPC = () => Math.floor(Math.random() * npcCount);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NpcListComponent,
        RouterLinkDirectiveStub
      ],
      imports: [
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatListModule
      ],
      providers: [
        GameService,
        ResponsiveService
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(NpcListComponent);
      component = fixture.componentInstance;
      testGame = createTestGame();
      npcCount = testGame.npcs.size;

      component.game.setGame(testGame);
      fixture.detectChanges();
    });
  }));

  it('should create', () => expect(component).toBeTruthy());

  it('should display some NPCs', () => {
    expect(getElements(By.css('mat-list-item')).length).toBe(npcCount, `should have ${npcCount} routerLinks`);
  });

  it('should get RouterLinks from template', () => {
    expect(getRouterLinks().length).toBe(npcCount, `should have ${npcCount} routerLinks`);
  });

  it('should click NPC links in template', () => {
    const clickedIndex = getRandomNPC();
    const item = getLinkElements()[clickedIndex];
    const link = getRouterLinks()[clickedIndex];

    expect(link.navigatedTo).toBeNull('should not have navigated yet');

    click(item);
    fixture.detectChanges();

    expect(link.navigatedTo).toEqual(['/npc', link.linkParams[1]], 'should navigate to correct parameters');
  });

  it('should react to adding NPCs', () => {
    component.game.createNPC('KhargonianMixGeckoMaineCoon', 'Pawprints-On-Snow-Under-A-Tree');
    fixture.detectChanges();
    expect(getElements(By.css('mat-list-item')).length).toBe(npcCount + 1, 'should display one more list item');
  });

  it('should react to removing NPCs', () => {
    const deletedIndex = getRandomNPC();
    const button = getElements(By.css('button'))[deletedIndex];

    spyOn(component, 'deleteNPC').and.callThrough();
    click(button);

    fixture.detectChanges();

    expect(component.deleteNPC).toHaveBeenCalled();
    expect(testGame.npcs.size).toBe(npcCount - 1, 'should remove an NPC from the service');
  });
});
