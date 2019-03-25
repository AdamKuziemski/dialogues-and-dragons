import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AbstractControl, NgForm, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { IdValidatorDirective } from './id-validator.directive';

import { GameService } from '@game/game.service';
import { createTestGame } from '@game/testing/test-game';

describe('IdValidatorDirective', () => {
  const invalidIds = ['TestItemDPUH', 'TestNPCTester', 'TestQuestPlumberBros', 'player'];
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
    it('should raise errors with an invalid id', fakeAsync(() => {
      const id = invalidIds[0];
      let page = new ModelPage();

      tick();
      expect(page.inputControl.hasError('invalidId')).toBe(false);
      expect(page.inputElement.value).toBe('');
      
      page.inputValue = id;

      tick();
      expect(page.inputElement.value).toBe(id);
      expect(page.component.myEntityId).toBe(id);
      expect(page.inputControl.hasError('invalidId')).toBe(true);
      expect(page.errorDiv).toBeTruthy();
    }));

    it('should accept a valid id', fakeAsync(() => {
      const id = validId;
      let page = new ModelPage();

      tick();
      expect(page.inputControl.hasError('invalidId')).toBe(false);
      expect(page.inputElement.value).toBe('');
      
      page.inputValue = id;

      tick();
      expect(page.inputElement.value).toBe(id);
      expect(page.component.myEntityId).toBe(id);
      expect(page.inputControl.hasError('invalidId')).toBe(false);
      expect(page.errorDiv).toBeNull();
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
  template: `
    <form>
      <input name="entityId" #entityId="ngModel" [(ngModel)]="myEntityId" ncvIdValidator>
      <div *ngIf="entityId.hasError('invalidId')">😠</div>
    </form>
  `
})
class NgModelTest {
  constructor(public game: GameService) {
    this.game.setGame(createTestGame());
  }
  myEntityId = '';
}

class ModelPage {
  fixture: ComponentFixture<NgModelTest>;
  component: NgModelTest;

  constructor() {
    this.fixture = initTest(NgModelTest, IdValidatorDirective);
    this.detectChanges();
    this.component = this.fixture.componentInstance;
  }

  get inputControl(): AbstractControl { return this.fixture.debugElement.children[0].injector.get(NgForm).control.get('entityId'); }
  get inputElement(): HTMLInputElement { return this.query('input'); }
  get errorDiv(): HTMLDivElement { return this.query('div'); }

  set inputValue(value: string) {
    this.inputElement.value = value;
    this.inputElement.dispatchEvent(new Event('input'));
    this.detectChanges();
  }

  detectChanges(): void {
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
