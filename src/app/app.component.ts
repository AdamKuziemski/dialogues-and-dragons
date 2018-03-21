import { Component, OnInit } from '@angular/core';

import { Dialogue } from './dialogue/dialogue.class';

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
    this.dialogue.addGreetings(['Doberek!', 'Siemanko!', 'Hejka!', 'Czołem!', 'Hej tam!']);

    this.dialogue.addTopic('No... siemka');
    this.dialogue.topics[0].addLine('No hejka');
    this.dialogue.topics[0].addLine('Co tam?');
    this.dialogue.addTopic('Mam coś dla Ciebie');
    this.dialogue.topics[1].addLine('A co masz?');
    this.dialogue.topics[1].addLine('Pokaż!');
  }
}
