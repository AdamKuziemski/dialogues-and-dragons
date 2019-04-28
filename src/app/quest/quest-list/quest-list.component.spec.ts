import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Predicate } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MatButtonModule, MatCardModule, MatIconModule, MatListModule } from '@angular/material';

import { click } from '@testing/click.function';
import { createTestGame } from '@game/testing/test-game';
import { GameService } from '@game-service';
import { QuestListComponent } from './quest-list.component';
import { ResponsiveService } from '@responsive-service';
import { RouterLinkDirectiveStub } from '@testing/router-link-directive-stub';

describe('QuestListComponent', () => {
  let component: QuestListComponent;
  let fixture: ComponentFixture<QuestListComponent>;
  const testGame = createTestGame();
  const questCount = Object.keys(testGame.quests).length;

  const elements = (query: Predicate<DebugElement>) => fixture.debugElement.queryAll(query);
  const linkElements = () => elements(By.directive(RouterLinkDirectiveStub));
  const routerLinks = () => linkElements().map(de => de.injector.get(RouterLinkDirectiveStub));
  const randomQuest = () => Math.floor(Math.random() * questCount);

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
      component.game.setGame(testGame);

      fixture.detectChanges();
    });
  }));

  it('should create', () => expect(component).toBeTruthy());

  it('should display some quests', () =>
    expect(elements(By.css('mat-list-item')).length).toBe(Object.keys(testGame.quests).length)
  );

  it('should get RouterLinks from template', () => {
    expect(routerLinks().length).toBe(questCount, `should have ${questCount} routerLinks`);
  });

  it('can click quest links in template', () => {
    const clickedIndex = randomQuest();
    const quest = linkElements()[clickedIndex];
    const link = routerLinks()[clickedIndex];

    expect(link.navigatedTo).toBeNull('should not have navigated yet');

    click(quest);
    fixture.detectChanges();

    expect(link.navigatedTo).toEqual(['/quest', link.linkParams[1]]);
  });
});
