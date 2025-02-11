import { Injectable, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';

export interface MessageDto {
  id: string;
  conversationId: string;
  content: string;
  sender: string;
  createdAt: string;
  rating: number;
}

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection!: signalR.HubConnection;

  messages = signal<MessageDto[]>([]);

  startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7178/chathub', { withCredentials: true })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {})
      .catch(() => {});

    this.hubConnection.on('ReceiveMessage', (message: MessageDto) => {
      if (message.conversationId !== localStorage.getItem('conversationId')) {
        return;
      }

      this.updateMessageList(message);
    });
  }

  private updateMessageList(newMessage: MessageDto): void {
    this.messages.update((messages) => {
      const existingMessageIndex = messages.findIndex(
        (m) => m.id === newMessage.id
      );

      if (existingMessageIndex !== -1) {
        return messages.map((m, i) =>
          i === existingMessageIndex ? { ...m, content: newMessage.content } : m
        );
      } else {
        return [...messages, newMessage];
      }
    });
  }

  cancelConnection(conversationId: string): void {
    this.hubConnection
      .invoke('CancelMessageGeneration', conversationId)
      .catch((err) => console.error('cancel fail', err));
  }
}
