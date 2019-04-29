import { DebugElement } from 'jasmine-core';

export class MouseClick {
  constructor(public button: number) {}
  stopPropagation() {} // stops the event from bubbling up the event chain
  preventDefault() {} // prevents the default action the browser makes on that event
}

export const ButtonClick = {
  left: 0,
  middle: 1,
  right: 2
};

export type Clicked = DebugElement | HTMLElement;

/** Simulate element click. Defaults to mouse left-button click event. */
export function click(el: Clicked, eventObj: MouseClick = new MouseClick(ButtonClick.left)): void {
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
