import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ChatStore } from '../../services/chat.store';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ChatActionsComponent } from './chat-actions/chat-actions.component';
import { ChatConversationComponent } from './chat-conversation/chat-conversation.component';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { ChatNewConversationComponent } from './chat-new-conversation/chat-new-conversation.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ChatHeaderComponent,
    ChatNewConversationComponent,
    ChatConversationComponent,
    ChatActionsComponent,
  ],
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit, OnDestroy {
  private chatStore = inject(ChatStore);

  get conversationId() {
    return this.chatStore.conversationId;
  }
  get messageInput() {
    return this.chatStore.messageInput;
  }
  get canCancel() {
    return this.chatStore.canCancel;
  }
  get messages() {
    return this.chatStore.messages;
  }

  ngOnInit(): void {
    if (this.chatStore.conversationId()) {
      this.chatStore.loadConversation();
    }
  }

  createConversation(): void {
    this.chatStore.createConversation();
  }

  sendMessage(): void {
    this.chatStore.sendMessage();
  }
  rateMessage(messageId: string, rating: number): void {
    this.chatStore.rateMessage(messageId, rating);
  }

  cancelMessage(): void {
    this.chatStore.cancelMessage();
  }

  ngOnDestroy(): void {
    if (this.chatStore.conversationId()) {
      this.chatStore.cancelMessage();
    }
  }
}
