import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
  exports: [
    ActionComponent,
    ActionDialogComponent,
    ActionEditComponent,
    ActionListComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    SharedModule
  ],
  providers: [
    ResponsiveService
  ],
})
export class ActionModule { }
