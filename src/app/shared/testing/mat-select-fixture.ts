import { OverlayContainer } from '@angular/cdk/overlay';
import { ComponentFixture, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class MatSelectFixture<T> {
  overlayContainer: OverlayContainer;
  overlayContainerElement: HTMLElement;

  element: any;
  trigger: any;

  options: HTMLElement[] = [];
  values: any[] = [];

  selectedIndex: number;
  firstNotSelectedIndex: number;

  selectedValue: any;
  firstNotSelectedValue: any;

  constructor(fixture: ComponentFixture<T>, indexOnPage?: number) {
    inject([OverlayContainer], (oc: OverlayContainer) => {
      this.overlayContainer = oc;
      this.overlayContainerElement = oc.getContainerElement();
    })();

    if (indexOnPage) {
      this.element = fixture.debugElement.queryAll(By.css('mat-select'))[indexOnPage];
      this.trigger = fixture.debugElement.queryAll(By.css('.mat-select-trigger'))[indexOnPage].nativeElement;
    } else {
      this.element = fixture.debugElement.query(By.css('mat-select'));
      this.trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
    }
  }

  click(): void {
    this.trigger.click();
  }

  clickOption(index: number) {
    this.options[index].click();
  }

  findOptions(): void {
    this.options = Array.from(this.overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>);
    this.values = this.options.map(option => option.getAttribute('value'));

    this.selectedIndex = this.options.findIndex(option => option.classList.contains('mat-selected'));
    this.firstNotSelectedIndex = this.options.findIndex(option => !option.classList.contains('mat-selected'));
    this.selectedValue = this.values[this.selectedIndex];
    this.firstNotSelectedValue = this.values[this.firstNotSelectedIndex];
  }
}
