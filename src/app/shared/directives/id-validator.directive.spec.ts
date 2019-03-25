import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NgForm, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    }).compileComponents();
    return TestBed.createComponent(component);
  }

  beforeEach(() => {
    gameService = new GameService();
    gameService.setGame(createTestGame());
    directive = new IdValidatorDirective(gameService);
  });

  describe('Basic functionality', () => {
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

  describe('Reactive form', () => {
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

  describe('Template driven form', () => {
    let fixture: ComponentFixture<NgModelTest>;

    it('should raise errors with an invalid id', fakeAsync(() => {
      fixture = initTest(NgModelTest, IdValidatorDirective);
      fixture.detectChanges();
      tick();

      const id = invalidIds[0];
      const inputControl = fixture.debugElement.children[0].injector.get(NgForm).control.get('entityId');
      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

      expect(inputControl.hasError('invalidId')).toBe(false);
      expect(inputElement.value).toBe('');
      
      inputElement.value = id;
      inputElement.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      tick();
      
      expect(fixture.componentInstance.myEntityId).toBe(id);
      expect(inputControl.hasError('invalidId')).toBe(true);
      expect(inputElement.value).toBe(id);
    }));

    it('should accept a valid id', fakeAsync(() => {
      fixture = initTest(NgModelTest, IdValidatorDirective);
      fixture.detectChanges();
      tick();

      const id = validId;
      const inputControl = fixture.debugElement.children[0].injector.get(NgForm).control.get('entityId');
      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

      expect(inputControl.hasError('invalidId')).toBe(false);
      expect(inputElement.value).toBe('');
      
      inputElement.value = id;
      inputElement.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      tick();
      
      expect(fixture.componentInstance.myEntityId).toBe(id);
      expect(inputControl.hasError('invalidId')).toBe(false);
      expect(inputElement.value).toBe(id);
    }));
  });
});

@Component({
  selector: 'ncv-entity-reactive-form',
  template: `<form [formGroup]="form"><input type="text" formControlName="entityId"></form>`
})
class FormControlTest {
  control: FormControl;
  form: FormGroup;
}

@Component({
  selector: 'ncv-entity-template-form',
  template: `<form><input name="entityId" [(ngModel)]="myEntityId" ncvIdValidator></form>`
})
class NgModelTest {
  constructor(public game: GameService) {
    this.game.setGame(createTestGame());
  }
  myEntityId = '';
}
