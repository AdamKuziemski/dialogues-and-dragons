import { OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class Destroyable implements OnDestroy {
  destroyed$: Subject<void> = new Subject<void>();

  constructor() {
    const originalOnDestroy: () => void = this.ngOnDestroy;

    this.ngOnDestroy = (): void => {
      this.destroyed$.next();
      this.destroyed$.complete();

      originalOnDestroy.apply(this);
    };
  }

  ngOnDestroy(): void {}
}

export function untilDestroyed<T extends Destroyable>(who: T): (source: Observable<any>) => Observable<any> {
  return (source: Observable<any>) => source.pipe(takeUntil(who.destroyed$));
}
