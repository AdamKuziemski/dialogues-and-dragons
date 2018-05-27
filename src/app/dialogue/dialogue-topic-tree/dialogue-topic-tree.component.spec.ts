import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueTopicTreeComponent } from './dialogue-topic-tree.component';

xdescribe('DialogueTopicTreeComponent', () => {
  let component: DialogueTopicTreeComponent;
  let fixture: ComponentFixture<DialogueTopicTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogueTopicTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueTopicTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
