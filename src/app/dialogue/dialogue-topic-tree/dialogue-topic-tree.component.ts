import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Dialogue } from '@dialogue/dialogue';
import { DialogueTopic, TopicContainer } from '@dialogue/dialogue-topic';
import { ResponsiveService } from '@responsive-service';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '@game/game.service';

// TODO create a fuction in a file and replace extends GameObject where possible
function lastOf<T>(elements: T[]): T {
  return elements[elements.length - 1];
}

type Panel = '' | 'searchBox' | 'breadcrumbs';

@Component({
  selector: 'ncv-dialogue-topic-tree',
  styleUrls: ['dialogue-topic-tree.component.scss'],
  templateUrl: 'dialogue-topic-tree.component.html',
})
export class DialogueTopicTreeComponent implements OnInit {
  @Input() dialogue: Dialogue;
  @Output() topicClicked: EventEmitter<number[]> = new EventEmitter;

  shouldOpenNewTopicsOnMobile: boolean = false; // this will do for now until we get a settings screen

  breadcrumbs: number[][] = [];
  searchPhrase: string = '';
  selectedTopic: number = 0;

  panelAboveContent: Panel = '';

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
    return this.breadcrumbs.slice(0, -1).length > 0;
  }

  goToTop(): void {
    if (this.path.length === 0) {
      return;
    }

    this.selectedTopic = this.breadcrumbs[0][0] || 0;
    this.breadcrumbs = [];

    this.closePanel();
  }

  onTopicClicked(index: number, event?: MouseEvent): void {
    if (!!event) {
      event.stopPropagation();
    }

    this.selectedTopic = index;
    this.topicClicked.emit([...this.path, index]);
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

    if (this.breadcrumbs.length === 0) {
      this.closePanel();
    }
  }

  open(index: number): void {
    this.breadcrumbs.push([...this.path, index]);

    if (this.breadcrumbs.length === 0) {
      this.closePanel();
    }
  }

  goToPath(breadcrumbIndex: number): void {
    const topicIndex = lastOf(this.breadcrumbs[breadcrumbIndex]);

    this.breadcrumbs = this.breadcrumbs.slice(0, breadcrumbIndex);
    this.togglePanel('breadcrumbs');
    this.open(topicIndex);
  }

  private togglePanel(panelName: Panel): void {
    this.panelAboveContent = this.panelAboveContent === panelName ? '' : panelName;
  }

  private closePanel(): void {
    this.panelAboveContent = '';
  }
}
