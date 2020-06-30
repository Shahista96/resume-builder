import { trigger, transition, query, style, animate, group, state } from '@angular/animations';

export function slideLeft() {
    return trigger('slideLeft', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
        group([
          query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
            optional: true,
          }),
          query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
            optional: true,
          }),
        ]),
      ]);
}

export function flyInOut() {
    return trigger('flyInOut', [
        state('*', style({ opacity: 1, transform: 'translateX(0)'})),
        transition(':enter', [
            style({ transform: 'translateX(-100%)', opacity: 0 }),
            animate('500ms ease-in')
        ]),
        transition(':leave', [
            animate('500ms ease-out', style({ transform: 'translateX(100%)', opacity: 0}))
        ])
    ]);
}

export function expand() {
    return trigger('expand', [
        state('*', style({ opacity: 1, transform: 'translateX(0)' })),
        transition(':enter', [
            style({ transform: 'translateY(-50%)', opacity:0 }),
            animate('200ms ease-in', style({ opacity: 1, transform: 'translateX(0)' }))
        ])
    ]);
}
