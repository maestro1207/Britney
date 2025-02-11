import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageDto } from '../../../services/signalr.service';
import { CommonModule } from '@angular/common';
import { ChatMessageItemComponent } from '../chat-message-item/chat-message-item.component';

@Component({
  selector: 'app-chat-messages',
  standalone: true,
  imports: [CommonModule, ChatMessageItemComponent],
  templateUrl: './chat-messages.component.html',
})
export class ChatMessagesComponent {
  @Input() messages: MessageDto[] = [];
  @Output() rateMessage = new EventEmitter<{
    messageId: string;
    rating: number;
  }>();

  onRate(event: { messageId: string; rating: number }): void {
    this.rateMessage.emit(event);
  }
}
