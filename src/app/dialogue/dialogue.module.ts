import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { DialogueComponent } from './dialogue.component';
import { DialogueLineComponent } from './dialogue-line/dialogue-line.component';
import { DialogueLineListComponent } from './dialogue-line-list/dialogue-line-list.component';
import { DialogueTopicComponent } from './dialogue-topic/dialogue-topic.component';

@NgModule({
  declarations: [
    DialogueComponent,
    DialogueLineComponent,
    DialogueLineListComponent,
    DialogueTopicComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatExpansionModule,
    MatInputModule,
    MatListModule
  ],
  providers: [],
  exports: [
    DialogueComponent,
    DialogueLineComponent,
    DialogueLineListComponent,
    DialogueTopicComponent
  ]
})
export class DialogueModule { }
