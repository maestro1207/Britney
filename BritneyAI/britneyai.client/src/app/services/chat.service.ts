import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Message {
  id: string;
  content: string;
  sender: number;
  rating?: number;
  createdAt: string;
}

export interface Conversation {
  id: string;
  createdAt: string;
  messages: Message[];
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private baseUrl = 'https://localhost:7178/api/chat';

  constructor(private http: HttpClient) {}

  createConversation(): Observable<Conversation> {
    return this.http.post<Conversation>(`${this.baseUrl}/conversations`, {});
  }

  sendMessage(conversationId: string, content: string): Observable<Message> {
    return this.http.post<Message>(
      `${this.baseUrl}/conversations/${conversationId}/messages`,
      { content, sender: 0 }
    );
  }

  rateMessage(messageId: string, rating: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/messages/${messageId}/rate`, {
      rating,
    });
  }

  getConversation(conversationId: string): Observable<Conversation> {
    return this.http.get<Conversation>(
      `${this.baseUrl}/conversations/${conversationId}`
    );
  }
}
