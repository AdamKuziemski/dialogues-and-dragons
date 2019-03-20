import { NgModule } from '@angular/core';

import { RemoveSpacesPipe } from './pipes/remove-spaces.pipe';
import { SplitUpperCasePipe } from './pipes/split-upper-case.pipe';
import { IdValidatorDirective } from './directives/id-validator.directive';

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
