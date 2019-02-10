import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { By } from '@angular/platform-browser';

import { MatCardModule, MatListModule } from '@angular/material';

import { GameService } from '@game-service';
import { QuestListComponent } from './quest-list.component';
import { ResponsiveService } from '@responsive-service';
import { RouterLinkDirectiveStub } from 'app/shared/testing/router-link-directive-stub';

describe('QuestListComponent', () => {
  let component: QuestListComponent;
  let fixture: ComponentFixture<QuestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuestListComponent,
        RouterLinkDirectiveStub
      ],
      imports: [
        MatCardModule,
        MatListModule
      ],
      providers: [
        GameService,
        ResponsiveService
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(QuestListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => expect(component).toBeTruthy());
});
