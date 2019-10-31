import { HAMMER_LOADER } from '@angular/platform-browser';

export const MockHammerJs = {
  provide: HAMMER_LOADER,
  useValue: () => new Promise(() => { })
};
