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

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
