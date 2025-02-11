import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MessageDto } from '../../../services/signalr.service';

@Component({
  selector: 'app-chat-message-item',
  standalone: true,
  imports: [CommonModule, MatBadgeModule, MatButtonModule],
  templateUrl: './chat-message-item.component.html',
})
export class ChatMessageItemComponent {
  @Input() message!: MessageDto;
  @Output() rate = new EventEmitter<{ messageId: string; rating: number }>();

  rateMessage(rating: number): void {
    this.rate.emit({ messageId: this.message.id, rating });
  }
}
