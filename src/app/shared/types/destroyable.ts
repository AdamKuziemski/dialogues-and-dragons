import { OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class Destroyable implements OnDestroy {
  destroyed$: Subject<void> = new Subject<void>();

  constructor() {
    // we're overwriting ngOnDestroy with a wrapper
    // this way ngOnDestroy is always called
    // regardless of whether the child class calls super.ngOnDestroy() or not
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
