import { Component, OnInit } from '@angular/core';

import { Dialogue } from './model/dialogue/dialogue';

@Component({
  selector: 'ncv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'NPC Conversations';

  dialogue: Dialogue = new Dialogue();

  ngOnInit() {
    this.createDialogue();
  }

  createDialogue() {
    this.dialogue.addGreetings(['Howdy!', 'Hello!', 'Hey there!', `Mornin'`, '*grunt*']);

    this.dialogue.addTopic('Um... Hi.');
    this.dialogue.topics[0].addLine('Hey, hey!');
    this.dialogue.topics[0].addLine(`What's up?`);

    this.dialogue.addTopic(`I've got something for you.`);
    this.dialogue.topics[1].addLine('Oooh, whatchu got?');
    this.dialogue.topics[1].addLine('Show me!');
    this.dialogue.topics[1].addTopic(`I was kidding. I don't have anything.`).goodbye = true;
    this.dialogue.topics[1].topics[0].addLine(`You're a bad person! Go away`);
  }

  private isInternetExploder(): boolean {
    const agent = window.navigator.userAgent;
    return agent.indexOf('MSIE') > -1 || agent.indexOf('Trident') > -1 || agent.indexOf('Edge') > -1;
  }

  private isBrowser(): boolean {
    return !this.isInternetExploder();
  }
}
