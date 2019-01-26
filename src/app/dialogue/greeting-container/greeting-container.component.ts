import { Component, Input } from '@angular/core';

import { Dialogue } from '@dialogue/dialogue';
import { ResponsiveService } from '@responsive-service';

@Component({
  selector: 'ncv-greeting-container',
  templateUrl: './greeting-container.component.html',
  styleUrls: ['./greeting-container.component.scss']
})
export class GreetingContainerComponent {
  @Input() dialogue: Dialogue;

  constructor(public responsive: ResponsiveService) { }

  addGreeting(): void {
    this.dialogue.addGreeting('');
  }

  deleteGreeting(index: number): void {
    this.dialogue.removeGreeting(index);
  }

}
