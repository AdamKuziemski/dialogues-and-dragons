import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Dialogue } from '@dialogue/dialogue';
import { DialogueTopic, TopicContainer } from '@dialogue/dialogue-topic';
import { ResponsiveService } from '@responsive-service';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '@game/game.service';

import { lastOf } from '../../shared/functions/last-of.function';

type Panel = '' | 'searchBox' | 'breadcrumbs';

@Component({
  selector: 'dnd-dialogue-topic-tree',
  styleUrls: ['dialogue-topic-tree.component.scss'],
  templateUrl: 'dialogue-topic-tree.component.html',
})
export class DialogueTopicTreeComponent implements OnInit {
  @Input() dialogue: Dialogue;
  @Output() topicClicked: EventEmitter<number[]> = new EventEmitter;

  shouldOpenNewTopicsOnMobile: boolean = false; // this will do for now until we get a settings screen

  breadcrumbs: number[][] = [];
  searchPhrase: string = '';
  panelAboveContent: Panel = '';

  selectedTopicPath: number[] = [0];
  selectedIndex: number = 0;

  npcName: string;

  constructor(
    public responsive: ResponsiveService,
    public game: GameService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.npcName = this.game.npc(this.route.snapshot.params.id).name;
  }

  get topics(): DialogueTopic[] {
    return this.currentTopicList.topics;
  }

  get currentTopicList(): TopicContainer {
    return this.breadcrumbs.length === 0 ?
      this.dialogue.topics :
      this.dialogue.topics.topic(...this.path).topics;
  }

  get path(): number[] {
    return this.breadcrumbs.length > 0 ? lastOf(this.breadcrumbs) : [];
  }

  get breadcrumbTopics(): DialogueTopic[] {
    return this.breadcrumbs.slice(0, -1).map((crumb: number[]) => this.dialogue.topics.topic(...crumb));
  }

  get parentTopic(): DialogueTopic {
    return this.dialogue.topics.topic(...this.path);
  }

  get canShowBreadcrumbList(): boolean {
    return this.breadcrumbs.length > 1;
  }

  get level(): number {
    return this.path.length;
  }

  goToTop(): void {
    if (this.path.length === 0) {
      return;
    }

    this.breadcrumbs = [];

    this.calculateSelectedIndex();
    this.closePanel();
  }

  onTopicClicked(index: number, event?: MouseEvent): void {
    if (!!event) {
      event.stopPropagation();
    }

    this.selectedTopicPath = [...this.path, index];
    this.calculateSelectedIndex();
    this.topicClicked.emit(this.selectedTopicPath);
  }

  addTopic(): void {
    this.currentTopicList.add('New topic');
    this.onTopicClicked(this.currentTopicList.length - 1);
  }

  toggleSearchBoxVisibility(): void {
    this.togglePanel('searchBox');
  }

  toggleBreadcrumbPanelVisibility(): void {
    this.togglePanel('breadcrumbs');
  }

  back(): void {
    this.breadcrumbs.pop();
    this.calculateSelectedIndex();

    if (this.breadcrumbs.length === 0) {
      this.closePanel();
    }
  }

  open(index: number): void {
    this.breadcrumbs.push([...this.path, index]);
    this.calculateSelectedIndex();

    if (this.breadcrumbs.length === 0) {
      this.closePanel();
    }
  }

  goToPath(breadcrumbIndex: number): void {
    const topicIndex = lastOf(this.breadcrumbs[breadcrumbIndex]);

    this.breadcrumbs = this.breadcrumbs.slice(0, breadcrumbIndex);
    this.togglePanel('breadcrumbs');
    this.open(topicIndex);

    this.calculateSelectedIndex();
  }

  private calculateSelectedIndex(): void {
    this.selectedIndex = this.hasConvergingPaths() && this.selectedTopicPath[this.level] !== undefined
      ? this.selectedTopicPath[this.level]
      : -1;
  }

  private togglePanel(panelName: Panel): void {
    this.panelAboveContent = this.panelAboveContent === panelName ? '' : panelName;
  }

  private closePanel(): void {
    this.panelAboveContent = '';
  }

  private hasConvergingPaths(): boolean {
    const pathPart = this.path.slice(0, this.level);

    return this.selectedTopicPath.slice(0, this.level).every((elem: number, index: number) => elem === pathPart[index]);
  }
}
