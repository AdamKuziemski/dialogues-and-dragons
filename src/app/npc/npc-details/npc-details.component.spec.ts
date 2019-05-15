import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { MatCardModule, MatCheckboxModule, MatInputModule, MatSelectModule } from '@angular/material';

import { ActivatedRoute, ActivatedRouteStub } from '@testing/activated-route-stub';
import { createTestGame } from '@game/testing/test-game';
import { click } from '@testing/click.function';
import { Game } from '@game/game';
import { GameService } from '@game-service';
import { NPC } from '@npc/npc';
import { NpcDetailsComponent } from './npc-details.component';
import { ResponsiveService } from '@responsive-service';
import { RouterLinkDirectiveStub } from '@testing/router-link-directive-stub';

describe('NpcDetailsComponent', () => {
  let component: NpcDetailsComponent;
  let fixture: ComponentFixture<NpcDetailsComponent>;
  let activatedRoute = new ActivatedRouteStub();
  let testGame: Game;

  const testNpcId = 'TestNPCQuestGiver';
  const testNPC = () => testGame.npcs[testNpcId];

  beforeEach(() => {
    activatedRoute.setParamMap({ id: testNpcId });
    testGame = createTestGame();
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NpcDetailsComponent,
        RouterLinkDirectiveStub
      ],
      imports: [
        FormsModule,
        MatCardModule,
        MatCheckboxModule,
        MatInputModule,
        MatSelectModule,
        NoopAnimationsModule
      ],
      providers: [
        GameService,
        ResponsiveService,
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(NpcDetailsComponent);
      component = fixture.componentInstance;
      component.game.setGame(testGame);
      fixture.detectChanges();
    });
  }));

  it('should create', () => expect(component).toBeTruthy());

  it('should subscribe to route params and retrieve an NPC', () => {
    expect(component.actorId).toBe(testNpcId);
    expect(component.npc).toEqual(testNPC());
    expect(component.hasSubscription).toBe(true);
  });

  it('should correctly return constants from NPC', () => {
    expect(component.maximumNameLength).toBe(NPC.maximumNameLength);
  });

  it('should display a mat-card with NPC details', fakeAsync(() => {
    tick();
    expect(fixture.debugElement.query(By.css('mat-card'))).not.toBeNull();
  }));

  it('should display a router link to a dialogue component and navigate to it', () => {
    const dialogueLink = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub))[0];
    const routerLink = dialogueLink.injector.get(RouterLinkDirectiveStub);
    const expectedLink = ['/dialogue', testNpcId];

    expect(dialogueLink).not.toBeNull();
    expect(routerLink).not.toBeNull();
    expect(routerLink.linkParams).toEqual(expectedLink);
    expect(routerLink.navigatedTo).toBeNull('should not have navigated yet');

    click(dialogueLink);
    fixture.detectChanges();

    expect(routerLink.navigatedTo).toEqual(expectedLink);
  });
});
