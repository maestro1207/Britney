import { Injectable, signal } from '@angular/core';
import { ChatService } from './chat.service';
import { MessageDto, SignalrService } from './signalr.service';

@Injectable({
  providedIn: 'root',
})
export class ChatStore {
  conversationId = signal<string | null>(
    localStorage.getItem('conversationId')
  );
  messageInput = signal<string>('');
  canCancel = signal<boolean>(false);
  messages = signal<MessageDto[]>([]);

  constructor(
    private chatService: ChatService,
    private signalRService: SignalrService
  ) {
    this.signalRService.startConnection();
    this.signalRService.initMessageHandler((message: MessageDto) => {
      if (message.conversationId !== this.conversationId()) {
        return;
      }
      this.messages.update((currentMessages) => {
        const index = currentMessages.findIndex((m) => m.id === message.id);
        if (index > -1) {
          return currentMessages.map((m, i) =>
            i === index ? { ...m, ...message } : m
          );
        } else {
          return [...currentMessages, message];
        }
      });
    });
  }

  loadConversation(): void {
    const convId = this.conversationId();
    if (convId) {
      this.chatService.getConversation(convId).subscribe({
        next: (conv) => {
          const messagesDto = conv.messages.map((msg) => ({
            ...msg,
            conversationId: conv.id,
            sender: msg.sender === 0 ? 'User' : 'Bot',
            rating: msg.rating ?? 0,
          }));
          this.messages.set(messagesDto);
        },
      });
    }
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
        error: (err) => {
          this.canCancel.set(false);
        },
      });
  }

  rateMessage(messageId: string, rating: number): void {
    this.messages.update((msgs) =>
      msgs.map((msg) => {
        if (msg.id === messageId) {
          const newRating = msg.rating === rating ? 0 : rating;
          this.chatService.rateMessage(messageId, newRating).subscribe();
          return { ...msg, rating: newRating };
        }
        return msg;
      })
    );
  }

  cancelMessage(): void {
    const convId = this.conversationId();
    if (convId) {
      this.signalRService.cancelConnection(convId);
    }
  }
}
