import { Component, Input } from '@angular/core';

import { Dialogue } from '@dialogue/dialogue';
import { ResponsiveService } from '@responsive-service';

@Component({
  selector: 'dnd-greeting-container',
  styleUrls: ['./greeting-container.component.scss'],
  templateUrl: './greeting-container.component.html',
})
export class GreetingContainerComponent {
  @Input() dialogue: Dialogue;

  constructor(public responsive: ResponsiveService) { }

  addGreeting(): void {
    this.dialogue.greetings.add('').isGreeting = true;
  }

  deleteGreeting(index: number): void {
    this.dialogue.greetings.remove(index);
  }

}
