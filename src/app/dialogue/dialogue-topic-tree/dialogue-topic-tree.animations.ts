import { animateChild, AnimationTriggerMetadata } from '@angular/animations';
import { animate, query, style, transition, trigger } from '@angular/animations';

const openedState = { height: '*', visibility: 'visible' };
const closedState = { height: '0px', visibility: 'hidden' };
const initialTopicState = { transform: 'scale(0.5)', opacity: 0 };
const visibleTopicState = { transform: 'scale(1)', opacity: 1 };

export const dialogueTreePanelAnimations: AnimationTriggerMetadata[] = [
  trigger('popInOut', [
    transition(':enter', [
      style(initialTopicState),
      animate('0.2s cubic-bezier(.8, -0.6, 0.2, 1.5)', style(visibleTopicState))
    ]),
    transition(':leave', [
      style({ ...visibleTopicState, height: '*' }),
      animate('0.1s cubic-bezier(.8, -0.6, 0.2, 1.5)', style({ ...initialTopicState, height: '0px' }))
    ])
  ]),
  trigger('panelToggle', [
    transition(':enter', [
      style(closedState),
      animate('0.2s ease-out', style(openedState)),
      query('@popInOut', animateChild(), { optional: true }),
    ]),
    transition(':leave', [
      style(openedState),
      query('@popInOut', animateChild(), { optional: true }),
      animate('0.2s ease-in', style(closedState)),
    ]),
  ]),
  trigger('moveOver', [
    transition(':enter', [
      style({ transform: 'translateX(-24px)' }),
      animate('0.1s ease-in', style({ transform: 'translateX(0%)' }))
    ])
  ]),
  trigger('squeezeOut', [
    transition(':enter', [
      style({ transform: 'translateX(24px)' }),
      animate('0.1s ease-in', style({ transform: 'translateX(0%)' }))
    ])
  ])
];
