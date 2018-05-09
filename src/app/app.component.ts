import { Component, OnInit } from '@angular/core';

import { Dialogue } from './model/dialogue/dialogue';
import { createTestDialogue } from './model/dialogue/testing/test-dialogue';

// import { GameObject } from './model/game-object';

@Component({
  selector: 'ncv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'NPC Conversations';

  dialogue: Dialogue = new Dialogue();

  ngOnInit() {
    // GameObject.initializeGameService(null);

    this.dialogue = createTestDialogue();
    this.dialogue.open();
  }

  private isInternetExploder(): boolean {
    const agent = window.navigator.userAgent;
    return agent.indexOf('MSIE') > -1 || agent.indexOf('Trident') > -1 || agent.indexOf('Edge') > -1;
  }

  private isBrowser(): boolean {
    return !this.isInternetExploder();
  }
}
