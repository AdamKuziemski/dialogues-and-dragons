import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ActivatedRoute, ActivatedRouteStub } from 'app/shared/testing/activated-route-stub';
import { createTestGame } from 'app/model/game/testing/test-game';
import { GameService } from '@game-service';
import { NpcDetailsComponent } from './npc-details.component';
import { ResponsiveService } from '@responsive-service';
import { RouterLinkDirectiveStub } from 'app/shared/testing/router-link-directive-stub';

describe('NpcDetailsComponent', () => {
  let component: NpcDetailsComponent;
  let fixture: ComponentFixture<NpcDetailsComponent>;
  let activatedRoute = new ActivatedRouteStub();
  const testGame = createTestGame();

  beforeEach(() => activatedRoute.setParamMap({ id: 'TestNPCQuestGiver' }));

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
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(NpcDetailsComponent);
      component = fixture.componentInstance;
      component.game.setGame(testGame);
      fixture.detectChanges();
    });
  }));

  it('should create', () => expect(component).toBeTruthy());
});
