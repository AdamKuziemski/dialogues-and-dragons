import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ActionComponent } from './action.component';
import { ActionDialogComponent } from './action-dialog/action-dialog.component';
import { ActionEditComponent } from './action-edit/action-edit.component';
import { ResponsiveService } from '@responsive-service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ActionComponent,
    ActionDialogComponent,
    ActionEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
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
    ActionEditComponent
  ]
})
export class ActionModule { }
