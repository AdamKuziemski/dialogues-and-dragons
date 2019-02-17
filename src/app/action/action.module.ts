import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MatButtonModule, MatDialogModule, MatInputModule, MatListModule, MatSelectModule } from '@angular/material';

import { ActionComponent } from './action.component';
import { ActionDialogComponent } from './action-dialog/action-dialog.component';
import { ActionEditComponent } from './action-edit/action-edit.component';
import { ActionListComponent } from './action-list/action-list.component';
import { ResponsiveService } from '@responsive-service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ActionComponent,
    ActionDialogComponent,
    ActionEditComponent,
    ActionListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    SharedModule
  ],
  entryComponents: [
    ActionDialogComponent
  ],
  providers: [
    ResponsiveService
  ],
  exports: [
    ActionComponent,
    ActionDialogComponent,
    ActionEditComponent,
    ActionListComponent
  ]
})
export class ActionModule { }
