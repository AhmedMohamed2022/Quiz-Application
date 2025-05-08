import {
  trigger,
  transition,
  style,
  animate,
  query,
  group,
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
]);

export const slideInAnimation = trigger('slideInAnimation', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate('300ms ease-in', style({ transform: 'translateX(0)' })),
  ]),
  transition(':leave', [
    animate('300ms ease-out', style({ transform: 'translateX(-100%)' })),
  ]),
]);

export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transform: 'scale(0.95)',
        }),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        animate(
          '300ms ease',
          style({
            opacity: 1,
            transform: 'scale(1)',
          })
        ),
      ],
      { optional: true }
    ),
  ]),
]);
