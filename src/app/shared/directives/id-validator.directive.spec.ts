import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { IdValidatorDirective } from './id-validator.directive';

import { createTestGame, GameService } from '@game/testing/test-game';
import { Player } from '@player';

describe('IdValidatorDirective', () => {
  const invalidIds = ['TestItemDPUH', 'TestNPCTester', 'TestQuestPlumberBros', Player.globalId];
  const validId = 'TestVeryUniqueValidId';

  let gameService: GameService;
  let directive: IdValidatorDirective;

  beforeEach(() => {
    gameService = new GameService();
    gameService.setGame(createTestGame());
    directive = new IdValidatorDirective(gameService);
  });

  describe('Basic functionality', () => {
    let input: FormControl;

    function testInvalidId(id: string): void {
      input.setValue(id);
      expect(directive.validate(input)).toEqual({
        invalidId: true
      });
    }

    beforeEach(() => input = new FormControl());

    it('should create an instance', () => expect(directive).toBeTruthy());
    it('should return an error when trying to use an existing or invalid ID', () => {
      invalidIds.forEach((id: string) => testInvalidId(id));
    });

    it('should return null when using a valid ID', () => {
      input.setValue(validId);
      expect(directive.validate(input)).toBe(null);
    });
  });

  describe('Reactive form', () => {
    let fixture: ComponentFixture<FormControlTestComponent>;
    let entityForm: FormGroup;

    const hasError = () => entityForm.get('entityId').hasError('invalidId');
    const getErrorDiv = () => fixture.debugElement.query(By.css('div'));
    const getInput = () => fixture.debugElement.query(By.css('input')).nativeElement;

    beforeEach(() => fixture = initTest(FormControlTestComponent, IdValidatorDirective));

    it('should raise errors with an invalid id', fakeAsync(() => {
      const id = invalidIds[0];

      entityForm = new FormGroup({ entityId: new FormControl(id, directive.validator) });

      expect(getInput().value).toEqual('', 'input value should not be set before detectChanges');
      expect(hasError()).toBe(true, 'control should have an error in the beginning');
      expect(getErrorDiv()).toBeNull('error div should not be visible before detectChanges');

      fixture.componentInstance.form = entityForm;
      fixture.detectChanges();
      tick();

      expect(getInput().value).toEqual(id, 'input value should set after detectChanges');
      expect(hasError()).toBe(true, 'control should still have an error');
      expect(getErrorDiv()).toBeTruthy('error div should be visible after detectChanges');
    }));

    it('should accept valid ids', fakeAsync(() => {
      const id = validId;

      entityForm = new FormGroup({ entityId: new FormControl(id, directive.validator) });

      expect(getInput().value).toEqual('', 'input value should not be set before detectChanges');
      expect(hasError()).toBe(false, 'control should not have an error for a valid id');
      expect(getErrorDiv()).toBeNull('error div should not be visible before detectChanges');

      fixture.componentInstance.form = entityForm;
      fixture.detectChanges();
      tick();

      expect(getInput().value).toEqual(id, 'input value should set after detectChanges');
      expect(hasError()).toBe(false, 'control should not have an error for a valid id');
      expect(getErrorDiv()).toBeNull('error div should not be visible for a valid id');
    }));
  });

  describe('Template driven form', () => {
    it('should raise errors with an invalid id', fakeAsync(() => {
      const id = invalidIds[0];
      const page = new ModelPage();

      tick();

      expect(page.inputElement.value).toBe('', 'input element value should not be set after onInit');
      expect(page.component.myEntityId).toBe('', 'component bound value should not be set after onInit');
      expect(page.inputControl.hasError('invalidId')).toBe(false, 'input control should not have an error after onInit');
      expect(page.errorDiv).toBeNull('there should be no error div after onInit');

      page.inputValue = id;

      tick();

      expect(page.inputElement.value).toBe(id, 'input element value should be ' + id + ' after detectChanges');
      expect(page.component.myEntityId).toBe(id, 'component bound value should be ' + id + ' after detectChanges');
      expect(page.inputControl.hasError('invalidId')).toBe(true, 'input control should have an error flag set after detectChanges');
      expect(page.errorDiv).toBeTruthy('error div should be displayed after detectChanges');
    }));

    it('should accept a valid id', fakeAsync(() => {
      const id = validId;
      const page = new ModelPage();

      tick();
      expect(page.inputElement.value).toBe('', 'input element value should not be set after onInit');
      expect(page.component.myEntityId).toBe('', 'component bound value should not be set after onInit');
      expect(page.inputControl.hasError('invalidId')).toBe(false, 'input control should not have an error after onInit');
      expect(page.errorDiv).toBeNull('there should be no error div after onInit');

      page.inputValue = id;

      tick();
      expect(page.inputElement.value).toBe(id, 'input element value should be ' + id + ' after detectChanges');
      expect(page.component.myEntityId).toBe(id, 'component bound value should be ' + id + ' after detectChanges');
      expect(page.inputControl.hasError('invalidId')).toBe(false, 'input control should not have an error flag set after detectChanges');
      expect(page.errorDiv).toBeNull('there should be no error div after detectChanges');
    }));
  });
});

@Component({
  selector: 'dnd-entity-reactive-form',
  template: `
    <form [formGroup]="form">
      <input type="text" formControlName="entityId">
      <div *ngIf="entityId.hasError('invalidId')">😠</div>
    </form>`
})
class FormControlTestComponent {
  control: FormControl;
  form: FormGroup;

  get entityId(): FormControl { return this.form.get('entityId') as FormControl; }
}

@Component({
  selector: 'dnd-entity-template-form',
  template: `
    <form>
      <input name="entityId" #entityId="ngModel" [(ngModel)]="myEntityId" dndIdValidator>
      <div *ngIf="entityId.hasError('invalidId')">😠</div>
    </form>
  `
})
class NgModelTestComponent {
  constructor(public game: GameService) {
    this.game.setGame(createTestGame());
  }
  myEntityId: string = '';
}

class ModelPage {
  fixture: ComponentFixture<NgModelTestComponent>;
  component: NgModelTestComponent;

  constructor() {
    this.fixture = initTest(NgModelTestComponent, IdValidatorDirective);
    this.component = this.fixture.componentInstance;
    this.fixture.detectChanges();
  }

  get inputControl(): AbstractControl { return this.fixture.debugElement.children[0].injector.get(NgForm).control.get('entityId'); }
  get inputElement(): HTMLInputElement { return this.query('input'); }
  get errorDiv(): HTMLDivElement { return this.query('div'); }

  set inputValue(value: string) {
    this.inputElement.value = value;
    this.inputElement.dispatchEvent(new Event('input'));
    this.fixture.detectChanges();
  }

  private query<T>(selector: string): T {
    return this.fixture.nativeElement.querySelector(selector);
  }
}

function initTest<T>(component: Type<T>, ...directives: Type<any>[]): ComponentFixture<T> {
  TestBed.configureTestingModule({
    declarations: [component, ...directives],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    providers: [GameService]
  }).compileComponents();

  return TestBed.createComponent(component);
}
