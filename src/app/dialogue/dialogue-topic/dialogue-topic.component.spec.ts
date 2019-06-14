import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';

import { DialogueTopicComponent } from './dialogue-topic.component';
import { DialogueTopic } from '@dialogue/dialogue-topic';
import { ResponsiveService } from '@responsive-service';

import { click } from '@testing/click.function';

describe('DialogueTopicComponent', () => {
  let component: DialogueTopicComponent;
  let fixture: ComponentFixture<DialogueTopicComponent>;
  let topicDebug: DebugElement;
  let topicElement: HTMLElement;
  let topic: DialogueTopic;

  /*
  * we're extracting as much as we can into this function
  * because we've got two describes and we don't want to repeat code
  */
  function setupTestModule(importedModules: any[], editMode = false): void {
    TestBed.configureTestingModule({
      declarations: [DialogueTopicComponent],
      imports: importedModules,
      providers: [MatDialog, ResponsiveService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().then(() => {
      topic = new DialogueTopic('Hey there, Ellie');
      topic.addLine(`Oh, howdy! I didn't see you there.`);
      topic.addLine(`Name's Ellie. I like cuddles and murder.`);

      fixture = TestBed.createComponent(DialogueTopicComponent);
      component = fixture.componentInstance;
      component.topic = topic;
      component.edit = editMode;

      topicDebug = fixture.debugElement;
      topicElement = fixture.debugElement.nativeElement;

      fixture.detectChanges();

      spyOn(component, 'addLine');
      spyOn(component, 'deleteLine');
    });
  }

  describe('Read mode', () => {
    beforeEach(async(() => setupTestModule([MatDialogModule])));

    it('should create', () => expect(component).toBeTruthy());

    it('should react to clicking', () => {
      spyOn(component, 'onClick');
      component.click.subscribe(selectedTopic => expect(selectedTopic).toBe(topic));

      click(topicDebug.query(By.css('span')).nativeElement);
      fixture.detectChanges();

      expect(component.onClick).toHaveBeenCalled();
    });
  });

  describe('Edit mode', () => {
    beforeEach(async(() => setupTestModule([
      MatCardModule,
      MatCheckboxModule,
      MatDialogModule,
      MatExpansionModule,
      MatInputModule,
      NoopAnimationsModule
    ], true)));

    function clickPanel(index: number): void {
      const panelMethods = ['openLinesPanel', 'openActionsPanel', 'openConditionsPanel'];
      spyOn(component, panelMethods[index] as keyof DialogueTopicComponent);

      topicDebug.queryAll(By.css('mat-expansion-panel'))[index].triggerEventHandler('opened', null);
      fixture.detectChanges();

      expect(component[panelMethods[index]]).toHaveBeenCalled();
    }

    it('should create', () => expect(component).toBeTruthy());
    it('should have a mat-card', () => expect(topicElement.querySelector('mat-card')).toBeTruthy());
    it('should have an accordion', () => expect(topicElement.querySelector('mat-accordion')).toBeTruthy());
    it('should have 3 expansion panels', () => expect(topicDebug.queryAll(By.css('mat-expansion-panel')).length).toBe(3));
    it('should be able to expand the lines panel', () => clickPanel(0));
    it('should be able to expand the actions panel', () => clickPanel(1));
    it('should be able to expand the conditions panel', () => clickPanel(2));
  });
});
