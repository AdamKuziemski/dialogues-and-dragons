import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { QuestDetailsComponent } from './quest-details.component';

describe('QuestDetailsComponent', () => {
  let component: QuestDetailsComponent;
  let fixture: ComponentFixture<QuestDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestDetailsComponent],
      imports: [
        /*MatCardModule,
        MatListModule*/
      ],
      providers: [
        /*GameService,
        ResponsiveService*/
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(QuestDetailsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => expect(component).toBeTruthy());
});
