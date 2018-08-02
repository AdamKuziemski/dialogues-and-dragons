import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

import { Dialogue } from '@dialogue/dialogue';
import { createTestDialogue } from '@dialogue/testing/test-dialogue';
import { ResponsiveService } from '@responsive-service';

import { GreetingContainerComponent } from './greeting-container.component';
import { LineContainerComponent } from '../line-container/line-container.component';

let component: GreetingContainerComponent;
let fixture: ComponentFixture<GreetingContainerComponent>;
let dialogue: Dialogue;

/*
* we're extracting as much as we can into this function
* because we've got two describes and we don't want to repeat code
*/
function setupTestModule(importedModules: any[], screenWidth: number): void {
  TestBed.configureTestingModule({
    declarations: [
      GreetingContainerComponent,
      LineContainerComponent
    ],
    imports: importedModules,
    providers: [ResponsiveService],
    schemas: [NO_ERRORS_SCHEMA]
  }).compileComponents().then(() => {
    fixture = TestBed.createComponent(GreetingContainerComponent);
    component = fixture.componentInstance;

    dialogue = createTestDialogue();
    component.dialogue = dialogue;

    fixture.debugElement.injector.get(ResponsiveService).setWidth(screenWidth);
    fixture.detectChanges();

    spyOn(component, 'addGreeting');
    spyOn(component, 'deleteGreeting');

    spyOn(component.dialogue, 'addGreeting');
    spyOn(component.dialogue, 'removeGreeting');
  });
}

describe('GreetingContainerComponent - desktop', () => {
  beforeEach(async(() => setupTestModule([MatExpansionModule, NoopAnimationsModule], 800)));

  it('should create', () => expect(component).toBeTruthy());
  it('should have an expansion panel', () => expect(fixture.debugElement.query(By.css('mat-expansion-panel'))).toBeDefined());

  it('should display the number of greetings', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-panel-description').textContent).toContain('1 total');
  });

  it('should react to #addGreeting click', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const addButton = buttons[buttons.length - 1].nativeElement; // the last button is the add button

    addButton.click();
    fixture.detectChanges();

    expect(addButton.textContent).toBe('Add');
    expect(component.addGreeting).toHaveBeenCalled();
  });

  it('should react to #delete click', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));

    buttons[0].nativeElement.click();
    fixture.detectChanges();

    expect(component.deleteGreeting).toHaveBeenCalled();
  });
});

describe('GreetingContainerComponent - mobile', () => {
  beforeEach(async(() => setupTestModule([MatCardModule, NoopAnimationsModule], 300)));

  it('should create', () => expect(component).toBeTruthy());
  it('should display a mat-card', () => expect(fixture.debugElement.query(By.css('mat-card'))).toBeDefined());

  it('should react to #addGreeting click', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const addButton = buttons[buttons.length - 1].nativeElement; // the last button is the add button

    addButton.click();
    fixture.detectChanges();

    expect(addButton.textContent).toBe('Add');
    expect(component.addGreeting).toHaveBeenCalled();
  });
});
