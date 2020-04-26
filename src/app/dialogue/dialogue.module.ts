import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';

import { ActionModule } from '../action/action.module';

import { DialogueComponent } from './dialogue.component';
import { DialogueLineComponent } from './dialogue-line/dialogue-line.component';
import { DialogueTopicComponent } from './dialogue-topic/dialogue-topic.component';
import { DialogueTopicTreeComponent } from './dialogue-topic-tree/dialogue-topic-tree.component';
import { LineContainerComponent } from './line-container/line-container.component';
import { GreetingContainerComponent } from './greeting-container/greeting-container.component';
import { TopicChildrenStatsComponent } from './topic-children-stats/topic-children-stats.component';
import { RemoveTopicDialogComponent } from './remove-topic-dialog/remove-topic-dialog.component';

@NgModule({
  declarations: [
    DialogueComponent,
    DialogueLineComponent,
    DialogueTopicComponent,
    DialogueTopicTreeComponent,
    LineContainerComponent,
    GreetingContainerComponent,
    TopicChildrenStatsComponent,
    RemoveTopicDialogComponent
  ],
  exports: [
    DialogueComponent,
    DialogueLineComponent,
    DialogueTopicComponent,
    DialogueTopicTreeComponent,
    LineContainerComponent,
    RemoveTopicDialogComponent
  ],
  imports: [
    ActionModule,
    CommonModule,
    DragDropModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatTabsModule,
    MatTreeModule
  ],
  providers: [],
})
export class DialogueModule { }
