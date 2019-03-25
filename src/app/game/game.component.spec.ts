import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatDialogModule, MatIconModule, MatTabsModule } from '@angular/material';
import { MatDialog } from '@angular/material';

import { GameComponent } from './game.component';
import { GameService } from '@game/game.service';
import { ResponsiveService } from '@responsive-service';

import { click } from '@testing/click.function';
import { MockHammerJs } from '@testing/hammer-js-mock';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent],
      imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatTabsModule,
        NoopAnimationsModule
      ],
      providers: [
        GameService,
        MatDialog,
        MockHammerJs,
        ResponsiveService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(GameComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      spyOn(component, 'addEntity');
    });
  }));

  it('should create', () => expect(component).toBeTruthy());

  it('should have 4 tabs',
    () => expect(fixture.debugElement.queryAll(By.css('.mat-tab-label')).length).toBe(4)
  );

  it('should open a dialog when the fab is clicked', () => {
    click(fixture.debugElement.query(By.css('button')));
    expect(component.addEntity).toHaveBeenCalled();
  });

});
