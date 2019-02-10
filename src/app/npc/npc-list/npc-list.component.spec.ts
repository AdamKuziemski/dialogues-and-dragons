import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { By } from '@angular/platform-browser';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { GameService } from '@game-service';
import { NpcListComponent } from './npc-list.component';
import { ResponsiveService } from '@responsive-service';
import { RouterLinkDirectiveStub } from 'app/shared/testing/router-link-directive-stub';

describe('NpcListComponent', () => {
  let component: NpcListComponent;
  let fixture: ComponentFixture<NpcListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NpcListComponent,
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
      fixture = TestBed.createComponent(NpcListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => expect(component).toBeTruthy());
});
