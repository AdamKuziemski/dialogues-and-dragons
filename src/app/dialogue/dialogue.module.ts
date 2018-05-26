import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule, MatTree } from '@angular/material/tree';

import { DialogueComponent } from './dialogue.component';
import { DialogueLineComponent } from './dialogue-line/dialogue-line.component';
import { DialogueTopicComponent } from './dialogue-topic/dialogue-topic.component';
import { DialogueTopicTreeComponent } from './dialogue-topic-tree/dialogue-topic-tree.component';
import { LineContainerComponent } from './line-container/line-container.component';

@NgModule({
  declarations: [
    DialogueComponent,
    DialogueLineComponent,
    DialogueTopicComponent,
    DialogueTopicTreeComponent,
    LineContainerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatTabsModule,
    MatTreeModule
  ],
  providers: [],
  exports: [
    DialogueComponent,
    DialogueLineComponent,
    DialogueTopicComponent,
    DialogueTopicTreeComponent,
    LineContainerComponent
  ]
})
export class DialogueModule { }
