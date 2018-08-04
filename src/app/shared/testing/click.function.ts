import { DebugElement } from 'jasmine-core';

export const ButtonClickEvents = {
  left:  { button: 0 },
  middle: { button: 1},
  right: { button: 2 }
};

/** Simulate element click. Defaults to mouse left-button click event. */
export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
 if (el instanceof HTMLElement) {
   el.click();
 } else {
   el.triggerEventHandler('click', eventObj);
 }
}
