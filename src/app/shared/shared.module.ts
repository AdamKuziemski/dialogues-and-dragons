import { NgModule } from '@angular/core';

import { RemoveSpacesPipe } from './pipes/remove-spaces.pipe';
import { SplitUpperCasePipe } from './pipes/split-upper-case.pipe';

@NgModule({
    declarations: [
        RemoveSpacesPipe,
        SplitUpperCasePipe
    ],
    imports: [],
    providers: [],
    exports: [
        RemoveSpacesPipe,
        SplitUpperCasePipe
    ]
})
export class SharedModule { }
