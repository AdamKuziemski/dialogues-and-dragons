import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTreeModule } from '@angular/material/tree';

import { DialogueTopicTreeComponent } from './dialogue-topic-tree.component';
import { Dialogue, createTestDialogue } from '@dialogue/testing/test-dialogue';
import { ResponsiveService } from '@responsive-service';

describe('DialogueTopicTreeComponent', () => {
  let component: DialogueTopicTreeComponent;
  let fixture: ComponentFixture<DialogueTopicTreeComponent>;
  const dialogue: Dialogue = createTestDialogue();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogueTopicTreeComponent],
      imports: [
        MatTreeModule,
        NoopAnimationsModule
      ],
      providers: [ResponsiveService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(DialogueTopicTreeComponent);
      component = fixture.componentInstance;
      component.dialogue = dialogue;
      fixture.detectChanges();
    });
  }));

  it('should create', () => expect(component).toBeTruthy());

  it('should react to topic clicks', () => {
    const testedTopic = dialogue.topics[0];
    const button = fixture.debugElement.queryAll(By.css('span'))[0].nativeElement;

    component.topicClicked.subscribe(clicked => expect(clicked).toBe(dialogue.topics[0]));
    expect(button.textContent).toBe(testedTopic.label);

    button.click();
  });
});
