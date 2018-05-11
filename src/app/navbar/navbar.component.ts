import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ncv-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() title = '';
  @Output() action: EventEmitter<string> = new EventEmitter();

  private edit = true;

  private toggleConversation(): void {
    this.edit = !this.edit;
    this.action.emit(this.edit ? 'edit' : 'chat');
  }
}
