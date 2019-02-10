import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { By } from '@angular/platform-browser';

import { MatCardModule, MatListModule } from '@angular/material';

import { GameService } from '@game-service';
import { ItemListComponent } from './item-list.component';
import { ResponsiveService } from '@responsive-service';
import { RouterLinkDirectiveStub } from 'app/shared/testing/router-link-directive-stub';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemListComponent,
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
      fixture = TestBed.createComponent(ItemListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => expect(component).toBeTruthy());
});
