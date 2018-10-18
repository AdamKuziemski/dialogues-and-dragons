import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionEditComponent } from './action-edit.component';

xdescribe('ActionEditComponent', () => {
  let component: ActionEditComponent;
  let fixture: ComponentFixture<ActionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionEditComponent ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ActionEditComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => expect(component).toBeTruthy());
});