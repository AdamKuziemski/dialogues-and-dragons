import { Component, OnInit } from '@angular/core';

import { Dialogue } from './model/dialogue/dialogue';
import { createTestDialogue } from './model/dialogue/testing/test-dialogue';
import { DialogueTopic } from './model/dialogue/dialogue-topic';

// import { GameObject } from './model/game-object';

@Component({
  selector: 'ncv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'NPC Conversations';
  edit = true;

  dialogue: Dialogue = createTestDialogue();
  currentTopic: DialogueTopic;

  ngOnInit() {
    // GameObject.initializeGameService(null);
    this.currentTopic = this.dialogue.topics[0];
    this.dialogue.open();
  }

  handleNavbarAction(action: string): void {
    this.edit = action === 'edit';
  }

  onTopicClicked(topic: DialogueTopic): void {
    this.currentTopic = topic;
  }

  private isInternetExploder(): boolean {
    const agent = window.navigator.userAgent;
    return agent.indexOf('MSIE') > -1 || agent.indexOf('Trident') > -1 || agent.indexOf('Edge') > -1;
  }

  private isBrowser(): boolean {
    return !this.isInternetExploder();
  }
}
