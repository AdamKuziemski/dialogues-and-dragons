import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestDetailsComponent } from './quest-details.component';

describe('QuestDetailsComponent', () => {
  let component: QuestDetailsComponent;
  let fixture: ComponentFixture<QuestDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
