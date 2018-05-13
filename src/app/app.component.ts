import { Component, HostListener, OnInit } from '@angular/core';

import { Dialogue } from './model/dialogue/dialogue';
import { createTestDialogue } from './model/dialogue/testing/test-dialogue';
import { DialogueTopic } from './model/dialogue/dialogue-topic';
import { ResponsiveService } from './shared/services/responsive.service';

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

  constructor(private responsive: ResponsiveService) {
    this.responsive.setWidth(window.innerWidth);
  }

  ngOnInit() {
    // GameObject.initializeGameService(null);
    this.dialogue.open();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.responsive.setWidth(event.target.innerWidth);
  }

  handleNavbarAction(action: string): void {
    this.edit = action === 'edit';
  }

  private isInternetExploder(): boolean {
    const agent = window.navigator.userAgent;
    return agent.indexOf('MSIE') > -1 || agent.indexOf('Trident') > -1 || agent.indexOf('Edge') > -1;
  }

  private isBrowser(): boolean {
    return !this.isInternetExploder();
  }
}
