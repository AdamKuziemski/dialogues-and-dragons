import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { DialogueLine } from '@dialogue/dialogue-line';
import { DialogueLineComponent } from '../dialogue-line/dialogue-line.component';
import { LineContainerComponent } from './line-container.component';
import { ResponsiveService } from '@responsive-service';

describe('LineContainerComponent', () => {
  let component: LineContainerComponent;
  let fixture: ComponentFixture<LineContainerComponent>;
  let lines: DialogueLine[] = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatIconModule
      ],
      declarations: [
        DialogueLineComponent,
        LineContainerComponent
      ],
      providers: [ ResponsiveService ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineContainerComponent);
    component = fixture.componentInstance;

    lines = [
      new DialogueLine('Hello'),
      new DialogueLine('Testing'),
      new DialogueLine('Components')
    ];
    component.lines = lines;

    fixture.detectChanges();

    spyOn(component, 'deleteLine');
    spyOn(component, 'onMoveUp');
    spyOn(component, 'onMoveDown');
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should display 3 lines', () => {
    expect(fixture.debugElement.queryAll(By.css('.ncv-line-container')).length).toBe(lines.length);
  });

  it('should react to the #delete click', () => {
    component.delete.subscribe(index => expect(index).toBe(1));

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons[2].nativeElement.click(); // first button in the second row

    expect(component.deleteLine).toHaveBeenCalled();
    expect(component.deleteLine).toHaveBeenCalledWith(1);
  });

  it('should react to the #moveUp click', () => {
    component.moveUp.subscribe(index => expect(index).toBe(1));

    component.moveLines = true;
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons[2].nativeElement.click(); // first button in the second row

    expect(component.onMoveUp).toHaveBeenCalled();
    expect(component.onMoveUp).toHaveBeenCalledWith(1);
  });

  it('should react to the #moveDown click', () => {
    component.moveDown.subscribe(index => expect(index).toBe(1));

    component.moveLines = true;
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons[3].nativeElement.click(); // second button in the second row

    expect(component.onMoveDown).toHaveBeenCalled();
    expect(component.onMoveDown).toHaveBeenCalledWith(1);
  });

  it('should not have a delete button on mobile', () => {
    fixture.debugElement.injector.get(ResponsiveService).setWidth(300);
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('button')).length).toBe(lines.length);
  });
});
