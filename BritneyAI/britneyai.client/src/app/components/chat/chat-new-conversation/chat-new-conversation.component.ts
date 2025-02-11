import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chat-new-conversation',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './chat-new-conversation.component.html',
})
export class ChatNewConversationComponent {
  @Output() createConversation = new EventEmitter<void>();
}
