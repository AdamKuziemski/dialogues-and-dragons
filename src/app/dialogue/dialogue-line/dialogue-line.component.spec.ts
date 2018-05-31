import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { DialogueLine } from '@dialogue/dialogue-line';
import { DialogueLineComponent } from './dialogue-line.component';

describe('DialogueLineComponent', () => {
  let component: DialogueLineComponent;
  let fixture: ComponentFixture<DialogueLineComponent>;
  let testLine: DialogueLine;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      declarations: [DialogueLineComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueLineComponent);
    component = fixture.componentInstance;

    testLine = new DialogueLine('Test line');
    component.line = testLine;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a click event with the test line when the span is clicked', () => {
    component.click.subscribe(line => expect(line).toBe(testLine));

    const span = fixture.nativeElement.querySelector('span');
    span.click();
  });

  it('should display a div with a textarea when in edit mode', () => {
    component.edit = true;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('div')).toBeTruthy();
  });

  it('should be bound to the input line', () => {
    component.edit = true;
    fixture.detectChanges();

    const debugComponent: DebugElement = fixture.debugElement;
    const debugArea = debugComponent.query(By.css('textarea'));
    const textarea: HTMLInputElement = debugArea.nativeElement;

    textarea.value = 'Hello';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(testLine.line).toEqual('Hello');
  });
});
