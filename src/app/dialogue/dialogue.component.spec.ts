import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MatCardModule, MatTabsModule } from '@angular/material';

import { ActivatedRoute, ActivatedRouteStub } from '@testing/activated-route-stub';
import { createTestDialogue } from '@dialogue/testing/test-dialogue';
import { createTestGame } from '@game/testing/test-game';
import { DialogueComponent } from './dialogue.component';
import { GameService } from '@game-service';
import { ResponsiveService } from '@responsive-service';

describe('DialogueComponent', () => {
  let component: DialogueComponent;
  let fixture: ComponentFixture<DialogueComponent>;
  let activatedRoute = new ActivatedRouteStub();
  const testNPC = 'TestNPCGossip';

  const testGame = createTestGame();
  testGame.npcs[testNPC].dialogue = createTestDialogue();

  beforeEach(() => activatedRoute.setParamMap({ id: testNPC }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogueComponent],
      imports: [
        MatCardModule,
        MatTabsModule
      ],
      providers: [
        GameService,
        ResponsiveService,
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(DialogueComponent);
      component = fixture.componentInstance;
      component.game.setGame(testGame);
      fixture.detectChanges();
    });
  }));

  it('should create', () => expect(component).toBeDefined());
  it('should have a dialogue', () => expect(component.dialogue).toBeDefined());
});
