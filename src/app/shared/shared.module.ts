import { NgModule } from '@angular/core';

import { IdValidatorDirective } from './directives/id-validator.directive';
import { RemoveSpacesPipe } from './pipes/remove-spaces.pipe';
import { SplitUpperCasePipe } from './pipes/split-upper-case.pipe';

@NgModule({
  declarations: [
    IdValidatorDirective,
    RemoveSpacesPipe,
    SplitUpperCasePipe,
  ],
  exports: [
    IdValidatorDirective,
    RemoveSpacesPipe,
    SplitUpperCasePipe,
  ],
  imports: [],
  providers: [],
})
export class SharedModule { }
