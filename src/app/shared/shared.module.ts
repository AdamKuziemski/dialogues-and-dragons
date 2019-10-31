import { NgModule } from '@angular/core';

import { IdValidatorDirective } from './directives/id-validator.directive';
import { RemoveSpacesPipe } from './pipes/remove-spaces.pipe';
import { SplitUpperCasePipe } from './pipes/split-upper-case.pipe';

@NgModule({
  declarations: [
    IdValidatorDirective,
    RemoveSpacesPipe,
    SplitUpperCasePipe
  ],
  imports: [],
  providers: [],
  exports: [
    IdValidatorDirective,
    RemoveSpacesPipe,
    SplitUpperCasePipe
  ]
})
export class SharedModule { }
