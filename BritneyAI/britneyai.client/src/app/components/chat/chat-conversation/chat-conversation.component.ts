import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageDto } from '../../../services/signalr.service';
import { CommonModule } from '@angular/common';
import { ChatMessagesComponent } from '../chat-messages/chat-messages.component';

@Component({
  selector: 'app-chat-conversation',
  standalone: true,
  imports: [CommonModule, ChatMessagesComponent],
  templateUrl: './chat-conversation.component.html',
})
export class ChatConversationComponent {
  @Input() conversationId: string | null = null;
  @Input() messages: MessageDto[] = [];
  @Output() rateMessage = new EventEmitter<{
    messageId: string;
    rating: number;
  }>();

  onRateMessage(event: { messageId: string; rating: number }): void {
    this.rateMessage.emit(event);
  }
}
