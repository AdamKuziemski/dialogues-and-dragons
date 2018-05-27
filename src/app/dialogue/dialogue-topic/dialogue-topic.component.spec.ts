import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueTopicComponent } from './dialogue-topic.component';

xdescribe('DialogueTopicComponent', () => {
  let component: DialogueTopicComponent;
  let fixture: ComponentFixture<DialogueTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogueTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
