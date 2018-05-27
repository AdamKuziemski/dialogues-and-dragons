import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetingContainerComponent } from './greeting-container.component';

xdescribe('GreetingContainerComponent', () => {
  let component: GreetingContainerComponent;
  let fixture: ComponentFixture<GreetingContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreetingContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreetingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
