import { DebugElement } from '@angular/core';

export function changeValue(input: DebugElement, newValue: string | number) {
  input.nativeElement.value = newValue;
  input.nativeElement.dispatchEvent(new Event('input'));
}
