import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { MatCardModule, MatCheckboxModule, MatInputModule } from '@angular/material';

import { ActivatedRoute, ActivatedRouteStub } from 'app/shared/testing/activated-route-stub';
import { createTestGame } from '@game/testing/test-game';
import { GameService } from '@game-service';
import { ItemDetailsComponent } from './item-details.component';
import { ResponsiveService } from '@responsive-service';

describe('ItemDetailsComponent', () => {
  let component: ItemDetailsComponent;
  let fixture: ComponentFixture<ItemDetailsComponent>;
  let activatedRoute = new ActivatedRouteStub();
  const testGame = createTestGame();

  beforeEach(() => activatedRoute.setParamMap({ id: 'TestItemPotion' }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemDetailsComponent],
      imports: [
        FormsModule,
        MatCardModule,
        MatCheckboxModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: [
        GameService,
        ResponsiveService,
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ItemDetailsComponent);
      component = fixture.componentInstance;
      component.game.setGame(testGame);
      fixture.detectChanges();
    });
  }));

  it('should create', fakeAsync(() => expect(component).toBeTruthy()));
});
