import { Component, Input } from '@angular/core';
import { TopicContainer } from '@dialogue/dialogue-topic';

@Component({
  selector: 'dnd-topic-children-stats',
  templateUrl: './topic-children-stats.component.html',
})
export class TopicChildrenStatsComponent {
  @Input() source: { topics: TopicContainer };

  constructor() { }
}
