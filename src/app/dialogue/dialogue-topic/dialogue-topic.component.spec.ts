import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';

import { DialogueTopicComponent } from './dialogue-topic.component';
import { DialogueTopic } from '@dialogue/dialogue-topic';

let component: DialogueTopicComponent;
let fixture: ComponentFixture<DialogueTopicComponent>;
const topic: DialogueTopic = new DialogueTopic('Oh hey there');

/*
* we're extracting as much as we can into this function
* because we've got two describes and we don't want to repeat code
*/
function setupTestModule(importedModules: any[], editMode = false): void {
  TestBed.configureTestingModule({
    declarations: [DialogueTopicComponent],
    imports: importedModules,
    schemas: [NO_ERRORS_SCHEMA]
  }).compileComponents().then(() => {
    fixture = TestBed.createComponent(DialogueTopicComponent);
    component = fixture.componentInstance;
    component.topic = topic;
    component.edit = editMode;

    fixture.detectChanges();
  });
}

describe('DialogueTopicComponent - read mode', () => {
  beforeEach(async(() => setupTestModule([])));

  it('should create', () => expect(component).toBeTruthy());
});

describe('DialogueTopicComponent - edit mode', () => {
  beforeEach(async(() => setupTestModule([
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatInputModule,
    NoopAnimationsModule
  ], true)));

  it('should create', () => expect(component).toBeTruthy());
});
