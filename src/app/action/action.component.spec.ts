import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionComponent } from './action.component';

xdescribe('ActionComponent', () => {
  let component: ActionComponent;
  let fixture: ComponentFixture<ActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionComponent]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ActionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => expect(component).toBeTruthy());
});
