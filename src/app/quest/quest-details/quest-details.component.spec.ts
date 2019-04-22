import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule, MatExpansionModule, MatInputModule, MatListModule } from '@angular/material';

import { ActivatedRoute, ActivatedRouteStub } from '@testing/activated-route-stub';
import { createTestGame } from '@game/testing/test-game';

import { Quest } from '@quest/quest';

import { QuestDetailsComponent } from './quest-details.component';
import { Game } from '@game/game';
import { GameService } from '@game/game.service';
import { ResponsiveService } from '@responsive-service';

describe('QuestDetailsComponent', () => {
  let component: QuestDetailsComponent;
  let fixture: ComponentFixture<QuestDetailsComponent>;
  let activatedRoute = new ActivatedRouteStub();

  let testGame: Game;
  const testQuestId = 'TestQuestPlumberBros';
  const testQuest = () => testGame.quests[testQuestId];

  beforeEach(() => {
    activatedRoute.setParamMap({ id: testQuestId });
    testGame = createTestGame();
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestDetailsComponent],
      imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatExpansionModule,
        MatInputModule,
        MatListModule,
        NoopAnimationsModule
      ],
      providers: [
        GameService,
        ResponsiveService,
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(QuestDetailsComponent);
      component = fixture.componentInstance;

      component.game.setGame(testGame);

      fixture.detectChanges();
    });
  }));

  it('should create', () => expect(component).toBeTruthy());

  it('should subscribe to route params and retrieve a quest', () => {
    expect(component.questId).toBe(testQuestId);
    expect(component.quest).toEqual(testQuest());
    expect(component.hasSubscription).toBe(true);
  });

  it('should correctly return constants from Quest', () => {
    expect(component.maximumNameLength).toBe(Quest.maximumNameLength);
    expect(component.maximumDescriptionLength).toBe(Quest.maximumDescriptionLength);
  });

  it('should display a mat-card with quest details', fakeAsync(() => {
    tick();
    expect(fixture.debugElement.query(By.css('mat-card'))).not.toBeNull();
  }));

  it('should display a mat-accordion with quest stages', fakeAsync(() => {
    tick();
    expect(fixture.debugElement.query(By.css('mat-accordion'))).not.toBeNull();
  }));

  it('should double bind inputs', fakeAsync(() => {
    tick();

    const nameInput = fixture.debugElement.query(By.css('input'));
    const descriptionArea = fixture.debugElement.queryAll(By.css('textarea'))[0];

    expect(nameInput).not.toBeNull();
    expect(descriptionArea).not.toBeNull();
    expect(nameInput.nativeElement.value).toBe(component.quest.name, 'name input binds with quest name');
    expect(descriptionArea.nativeElement.value).toBe(component.quest.description, 'description input binds with quest description');

    nameInput.nativeElement.value = 'NewTestName';
    nameInput.nativeElement.dispatchEvent(new Event('input'));
    descriptionArea.nativeElement.value = 'Hurro';
    descriptionArea.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    expect(component.quest.name).toBe('NewTestName', 'quest name changes when name input changes value');
    expect(component.quest.description).toBe('Hurro', 'quest description changes when description input changes value');
  }));
});
