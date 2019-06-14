import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { createTestGame } from '@game/testing/test-game';
import { GameService } from '@game-service';
import { GameDetailsComponent } from './game-details.component';
import { ResponsiveService } from '@responsive-service';

describe('GameDetailsComponent', () => {
  let component: GameDetailsComponent;
  let fixture: ComponentFixture<GameDetailsComponent>;
  const testGame = createTestGame();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameDetailsComponent],
      imports: [
        FormsModule,
        MatCardModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: [
        GameService,
        ResponsiveService,
        // { provide: ActivatedRoute, useValue: activatedRoute }
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(GameDetailsComponent);
      component = fixture.componentInstance;
      component.gameService.setGame(testGame);
      fixture.detectChanges();
    });
  }));

  it('should create', () => expect(component).toBeTruthy());
});
