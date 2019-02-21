import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionEditComponent } from './action-edit.component';
import { createTestGame } from '@game/testing/test-game';
import { GameService } from '@game-service';

xdescribe('ActionEditComponent', () => {
  let component: ActionEditComponent;
  let fixture: ComponentFixture<ActionEditComponent>;
  const testGame = createTestGame();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionEditComponent],
      providers: [GameService]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ActionEditComponent);
      component = fixture.componentInstance;
      component.game.setGame(testGame);
      fixture.detectChanges();
    });
  }));

  it('should create', () => expect(component).toBeTruthy());
});
