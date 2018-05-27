import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueLine } from '@dialogue/dialogue-line';
import { DialogueLineComponent } from './dialogue-line.component';

import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('DialogueLineComponent', () => {
  let component: DialogueLineComponent;
  let fixture: ComponentFixture<DialogueLineComponent>;
  let testLine: DialogueLine;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [DialogueLineComponent]
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

  it('should emit a click event with the test line', () => {
    component.click.subscribe(line => expect(line).toBe(testLine));

    const span = fixture.nativeElement.querySelector('span');
    span.click();
  });
});
