import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Predicate } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { click } from '@testing/click.function';
import { Game, GameService, createTestGame } from '@game/testing/test-game';
import { RouterLinkDirectiveStub } from '@testing/router-link-directive-stub';

import { QuestListComponent } from './quest-list.component';
import { ResponsiveService } from '@responsive-service';

describe('QuestListComponent', () => {
  let component: QuestListComponent;
  let fixture: ComponentFixture<QuestListComponent>;
  let testGame: Game;
  let questCount: number;

  const getElements = (query: Predicate<DebugElement>) => fixture.debugElement.queryAll(query);
  const getLinkElements = () => getElements(By.directive(RouterLinkDirectiveStub));
  const getRouterLinks = () => getLinkElements().map(de => de.injector.get(RouterLinkDirectiveStub));
  const getRandomQuest = () => Math.floor(Math.random() * questCount);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuestListComponent,
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
      fixture = TestBed.createComponent(QuestListComponent);
      component = fixture.componentInstance;
      testGame = createTestGame();
      questCount = testGame.quests.size;

      component.game.setGame(testGame);

      fixture.detectChanges();
    });
  }));

  it('should create', () => expect(component).toBeTruthy());

  it('should display some quests', () => {
    expect(getElements(By.css('mat-list-item')).length).toBe(questCount, `should have ${questCount} list items`);
  });

  it('should get RouterLinks from template', () => {
    expect(getRouterLinks().length).toBe(questCount, `should have ${questCount} routerLinks`);
  });

  it('should click quest links in template', () => {
    const clickedIndex = getRandomQuest();
    const quest = getLinkElements()[clickedIndex];
    const link = getRouterLinks()[clickedIndex];

    expect(link.navigatedTo).toBeNull('should not have navigated yet');

    click(quest);
    fixture.detectChanges();

    expect(link.navigatedTo).toEqual(['/quest', link.linkParams[1]], 'should navigate to correct parameters');
  });

  it('should react to adding quests', () => {
    component.game.createQuest('VeryUniqueMissableQuest', 'This is quest is so missable even Chuck Norris finds it only 99.9% of the time');
    fixture.detectChanges();
    expect(getElements(By.css('mat-list-item')).length).toBe(questCount + 1, 'should display one more list item');
  });

  it('should react to removing quests', () => {
    const deletedIndex = getRandomQuest();
    const button = getElements(By.css('button'))[deletedIndex];

    spyOn(component, 'deleteQuest').and.callThrough();
    click(button);

    fixture.detectChanges();

    expect(component.deleteQuest).toHaveBeenCalled();
    expect(testGame.quests.size).toBe(questCount - 1, 'should remove a quest from the service');
  });
});
