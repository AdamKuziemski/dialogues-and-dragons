import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../../shared/shared.module';

import { MatSelectFixture } from '@testing/mat-select-fixture';

import { AddItem } from '@action/add-item.action';
import { ActionEditComponent } from './action-edit.component';
import { GameObject } from '../../model/game-object';
import { GameService, createTestGame } from '@game/testing/test-game';

xdescribe('ActionEditComponent', () => {
  let component: ActionEditComponent;
  let fixture: ComponentFixture<ActionEditComponent>;
  const testGame = createTestGame();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionEditComponent],
      imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatSelectModule,
        NoopAnimationsModule,
        SharedModule
      ],
      providers: [GameService]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ActionEditComponent);
      component = fixture.componentInstance;
      component.game.setGame(testGame);

      GameObject.initializeGameService(component.game);

      component.action = new AddItem();

      fixture.detectChanges();
    });
  }));

  it('should create', () => expect(component).toBeTruthy());

  it('should change action types when type select changes', fakeAsync(() => {
    const typeSelect = new MatSelectFixture<ActionEditComponent>(fixture, 0);
    expect(typeSelect.element).not.toBeNull();

    typeSelect.click();
    fixture.detectChanges();
    flush();

    typeSelect.findOptions();

    expect(typeSelect.selectedValue).toEqual(new AddItem(), 'type select binds with action type');

    typeSelect.clickOption(typeSelect.firstNotSelectedIndex);
    fixture.detectChanges();
    flush();

    expect(component.editedAction.name).toBe(typeSelect.firstNotSelectedValue, 'action type should change when another option is clicked');
  }));
});
