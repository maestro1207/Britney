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
import { SignalrService } from '../../services/signalr.service';

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

  conversationId = signal<string | null>(null);
  messageInput = signal<string>('');
  canCancel = signal<boolean>(false);
  messages = this.signalRService.messages;

  ngOnInit(): void {
    this.signalRService.startConnection();
  }

  createConversation(): void {
    this.chatService.createConversation().subscribe({
      next: (conv) => {
        this.signalRService.cancelConnection(conv.id);
        this.conversationId.set(conv.id);

        this.messages.set([]);
        this.signalRService.startConnection();
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
    if (this.conversationId) {
      this.signalRService.cancelConnection(this.conversationId()!);
    }
  }
}
