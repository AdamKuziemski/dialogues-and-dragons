import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueComponent } from './dialogue.component';
import { createTestDialogue } from '@dialogue/testing/test-dialogue';

xdescribe('DialogueComponent', () => {
  let component: DialogueComponent;
  let fixture: ComponentFixture<DialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogueComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueComponent);
    component = fixture.componentInstance;

    component.dialogue = createTestDialogue();

    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeDefined());
  it('should have a dialogue', () => expect(component.dialogue).toBeDefined());

});
