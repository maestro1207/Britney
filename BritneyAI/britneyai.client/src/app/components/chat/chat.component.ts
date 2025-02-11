import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { ChatService } from '../../services/chat.service';
import { MessageDto, SignalrService } from '../../services/signalr.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatBadgeModule,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit, OnDestroy {
  private chatService = inject(ChatService);
  private signalRService = inject(SignalrService);

  conversationId = signal<string | null>(
    localStorage.getItem('conversationId')
  );

  messageInput = signal<string>('');
  canCancel = signal<boolean>(false);
  messages = this.signalRService.messages;

  ngOnInit(): void {
    this.signalRService.startConnection();

    if (this.conversationId()) {
      this.fetchMessages();
    }
  }

  fetchMessages(): void {
    this.chatService.getConversation(this.conversationId()!).subscribe({
      next: (conv) => {
        const messagesDto: MessageDto[] = conv.messages.map((msg) => ({
          ...msg,
          conversationId: conv.id,
          sender: msg.sender === 0 ? 'User' : 'Bot',
          rating: msg.rating ?? 0,
        }));
        this.messages.set(messagesDto);
        console.log('this.messages', this.messages());
      },
    });
  }

  createConversation(): void {
    this.cancelMessage();
    this.chatService.createConversation().subscribe({
      next: (conv) => {
        this.conversationId.set(conv.id);
        localStorage.setItem('conversationId', conv.id);

        this.messages.set([]);
      },
    });
  }
  sendMessage(): void {
    if (!this.conversationId() || !this.messageInput().trim()) return;
    this.canCancel.set(true);

    this.chatService
      .sendMessage(this.conversationId()!, this.messageInput())
      .subscribe({
        next: () => {
          this.messageInput.set('');
          this.canCancel.set(false);
        },
      });
  }

  rateMessgae(messageId: string, rating: number): void {
    this.messages.update((msgs) =>
      msgs.map((msg) => {
        if (msg.id === messageId) {
          const newRate = msg.rating === rating ? 0 : rating;

          this.chatService.rateMessage(messageId, newRate).subscribe();

          return { ...msg, rating: newRate };
        }
        return msg;
      })
    );
  }

  cancelMessage() {
    this.signalRService.cancelConnection(this.conversationId()!);
  }

  ngOnDestroy(): void {
    if (this.conversationId()) {
      this.signalRService.cancelConnection(this.conversationId()!);
    }
  }
}
