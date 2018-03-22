import { NgModule } from '@angular/core';

import { SplitUpperCasePipe } from './pipes/split-upper-case.pipe';

@NgModule({
    declarations: [
        SplitUpperCasePipe
    ],
    imports: [],
    providers: [],
    exports: [
        SplitUpperCasePipe
    ]
})
export class SharedModule { }
