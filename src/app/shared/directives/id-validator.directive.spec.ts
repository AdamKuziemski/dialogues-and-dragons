import { CommonModule } from '@angular/common';
import { Component, Type, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { IdValidatorDirective } from './id-validator.directive';

import { GameService } from '@game/game.service';
import { createTestGame } from '@game/testing/test-game';

describe('IdValidatorDirective', () => {
  const invalidIds = ['TestItemDPUH', 'TestNPCTester', 'TestQuestPlumberBros', 'player'];
  const validId = 'TestVeryUniqueValidId';

  let gameService: GameService;
  let directive: IdValidatorDirective;

  function initTest<T>(component: Type<T>, ...directives: Type<any>[]): ComponentFixture<T> {
    TestBed.configureTestingModule({
      declarations: [component, ...directives],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
      providers: [GameService]
    });
    return TestBed.createComponent(component);
  }

  beforeEach(() => {
    gameService = new GameService();
    gameService.setGame(createTestGame());
    directive = new IdValidatorDirective(gameService);
  });

  describe('basic functionality', () => {
    let input: FormControl;

    function testInvalidId(id: string) {
      input.setValue(id);
      expect(directive.validate(input)).toEqual({
        invalidId: true
      });
    }

    beforeEach(() => input = new FormControl());

    it('should create an instance', () => expect(directive).toBeTruthy());
    it('should return an error when trying to use an existing or invalid ID', () => invalidIds.forEach(id => testInvalidId(id)));

    it('should return null when using a valid ID', () => {
      input.setValue(validId);
      expect(directive.validate(input)).toBe(null);
    });
  });

  describe('reactive form', () => {
    let fixture: ComponentFixture<FormControlTest>;

    function testIdValidity(id: string, errorFlag: boolean) {
      const entityForm = new FormGroup({ 'entityId': new FormControl(id, directive.validator) });
      fixture.componentInstance.form = entityForm;
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('input'));
      expect(input.nativeElement.value).toEqual(id);
      expect(entityForm.controls['entityId'].hasError('invalidId')).toBe(errorFlag);
    }

    beforeEach(() => fixture = initTest(FormControlTest, IdValidatorDirective));
    
    it('should raise errors with invalid ids', () => invalidIds.forEach(id => testIdValidity(id, true)));
    it('should accept valid ids', () => testIdValidity(validId, false));
  });

  describe('template driven form', () => {
    let fixture: ComponentFixture<NgModelTest>;

    function testIdValidity(id: string, errorFlag: DebugElement) {
      const input = fixture.debugElement.query(By.css('input')).nativeElement;
      input.value = id;
      
      tick();
      fixture.detectChanges();

      const errorDiv = fixture.debugElement.query(By.css('div'));

      expect(input.value).toEqual(id);
      expect(errorDiv).toBe(errorFlag);
    }

    beforeEach(() => fixture = initTest(NgModelTest, IdValidatorDirective));
    
    it('should raise errors with an invalid id', fakeAsync(() => testIdValidity('TestItemDPUH', null)));
    it('should accept a valid id', fakeAsync(() => testIdValidity(validId, null))); 
  });
});

@Component({
  selector: 'entity-reactive-form',
  template: `
    <form [formGroup]="form">
      <input type="text" formControlName="entityId">
    </form>`
})
class FormControlTest {
  control: FormControl;
  form: FormGroup;
}

@Component({
  selector: 'entity-template-form',
  template: `
    <form #entity="ngForm">
      <input id="entity-id" name="entity-id" #entityId="ngModel" [(ngModel)]="myEntityId" ncvIdValidator>
      <div *ngIf="entityId.hasError('invalidId')">This id is already being used</div>
    </form>`
})
class NgModelTest {
  myEntityId: string;
}
