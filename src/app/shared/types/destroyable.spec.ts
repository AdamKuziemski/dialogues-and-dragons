import { OnDestroy } from '@angular/core';

import { Destroyable } from './destroyable';

class WithoutOnDestroy extends Destroyable {}

class WithOnDestroy extends Destroyable implements OnDestroy {
  hasDestroyed: boolean = false;

  ngOnDestroy(): void {
    this.hasDestroyed = true;
  }
}

describe('Destroyable', () => {
  describe('without original onDestroy handler', () => {
    it('should emit and complete when onDestroy is called', () => {
      const instance: WithoutOnDestroy = new WithoutOnDestroy();

      instance.destroyed$.subscribe(
        () => {}, // next
        () => {}, // error
        () => { // complete
          expect(instance.destroyed$.isStopped).toBe(true);
        }
      );

      expect(instance.destroyed$.isStopped).toBe(false);
      instance.ngOnDestroy();
    });
  });

  describe('with original onDestroy handler', () => {
    it('should call ngOnDestroy from the child class before emitting', () => {
      const instance: WithOnDestroy = new WithOnDestroy();

      expect(instance.hasDestroyed).toBe(false);
      expect(instance.destroyed$.isStopped).toBe(false);

      instance.ngOnDestroy();

      expect(instance.hasDestroyed).toBe(true);
      expect(instance.destroyed$.isStopped).toBe(true);
    });
  });
});
