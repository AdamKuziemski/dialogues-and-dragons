import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { GameComponent } from './game.component';
import { MatButtonModule, MatIconModule, MatTabsModule } from '@angular/material';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent],
      imports: [
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        NoopAnimationsModule
      ],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA] // for now, will create some tests later
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(GameComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => expect(component).toBeTruthy());
});
