import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { first, map } from 'rxjs/operators';

import { Dialogue } from '@dialogue/dialogue';
import { DialogueTopic } from '@dialogue/dialogue-topic';

import { GameService } from '@game-service';
import { NPC } from '@npc/npc';
import { ResponsiveService } from '@responsive-service';

import { Destroyable, untilDestroyed } from 'app/shared/types/destroyable';
import { lastOf } from 'app/shared/functions/last-of.function';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Decision, RemoveTopicDialogComponent } from './remove-topic-dialog/remove-topic-dialog.component';

@Component({
  selector: 'dnd-dialogue',
  styleUrls: ['./dialogue.component.scss'],
  templateUrl: './dialogue.component.html',
})
export class DialogueComponent extends Destroyable implements OnInit, OnDestroy {
  @Input() dialogue: Dialogue;
  @Input() speaker: string = 'Some NPC';

  @Output() goodbye: EventEmitter<Dialogue> = new EventEmitter<Dialogue>();

  npcId: string;

  currentTopicPath: number[] = [0];
  currentTopic: DialogueTopic;
  currentTab: number = 1;

  constructor(
    public game: GameService,
    public responsive: ResponsiveService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      untilDestroyed(this),
    ).subscribe((id: string) => {
      this.npcId = id;

      const npc: NPC = this.game.npc(this.npcId);
      if (!npc) {
        return;
      }

      if (npc.dialogue.topics.length === 0) {
        npc.dialogue = Dialogue.exampleDialogue();
      }

      this.speaker = npc.name;
      this.dialogue = npc.dialogue;
      this.currentTopic = this.dialogue.topics.topic(0);
      this.dialogue.reset();
    });

    // this.dialogue.finished.pipe(untilDestroyed(this)).subscribe(status => {});

    this.game.editModeChange.pipe(
      untilDestroyed(this)
    ).subscribe(
      () => this.dialogue.open()
    );
  }

  ngOnDestroy(): void {
    this.game.npc(this.npcId).dialogue = this.dialogue;
  }

  swipeLeft(): void {
    this.currentTab += 1;
  }

  swipeRight(): void {
    this.currentTab -= 1;
  }

  onTopicSelected(path: number[]): void {
    this.currentTopicPath = [...path];
    this.currentTopic = this.dialogue.topics.topic(...path);
    this.currentTab = 2;
  }

  onTopicRemoved(): void {
    const removedTopic = this.dialogue.topics.topic(...this.currentTopicPath);

    const dialogRef: MatDialogRef<RemoveTopicDialogComponent> = this.dialog.open(RemoveTopicDialogComponent, {
      data: removedTopic,
      width: this.responsive.isDesktop() ? '40%' : '80%'
    });

    dialogRef.afterClosed().pipe(first()).subscribe((decision: Decision) => {
      switch (decision) {
        case Decision.Cancel:
          return;
        case Decision.MoveUp:
          this.moveChildrenUp(removedTopic);
          this.removeCurrentTopic();
          break;
        case Decision.RemoveTopic:
          this.removeCurrentTopic();
          break;
        default: break;
      }
    });
  }

  private removeCurrentTopic(): void {
    const parentTopic = this.getParentTopic();

    if (parentTopic === null) {
      this.dialogue.topics.remove(lastOf(this.currentTopicPath));
    } else {
      parentTopic
        .topics.topic(...this.currentTopicPath.slice(0, -2))
        .topics.remove(lastOf(this.currentTopicPath));
    }

    // TODO open closest neighbor
  }

  private moveChildrenUp(source: DialogueTopic): void {
    const parentTopic = this.getParentTopic();

    // TODO put the children where the removed topic was
    if (parentTopic === null) {
      this.dialogue.topics.topics.push(...source.topics.topics);
    } else {
      parentTopic.topics.topics.push(...source.topics.topics);
    }
  }

  private getParentTopic(): DialogueTopic | null {
    return this.dialogue.topics.topic(...this.currentTopicPath.slice(0, -1));
  }
}
