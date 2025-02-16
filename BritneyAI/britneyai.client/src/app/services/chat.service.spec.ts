import { TestBed } from '@angular/core/testing';

import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ChatService, Conversation, Message } from './chat.service';
import { provideHttpClient } from '@angular/common/http';

describe('ChatService', () => {
  let service: ChatService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [ChatService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ChatService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a conversaton', () => {
    const mockData: Conversation = {
      id: '1',
      createdAt: new Date().toISOString(),
      messages: [],
    };

    service.createConversation().subscribe((conversation) => {
      expect(conversation).toEqual(mockData);
    });

    const req = httpMock.expectOne(
      'https://localhost:7178/api/chat/conversations'
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockData);
  });

  it('should send a mesasge', () => {
    const conversationId = '1';
    const content = 'Can u UwU?';
    const mockData: Message = {
      id: '1',
      content,
      sender: 0,
      createdAt: new Date().toISOString(),
    };

    service.sendMessage(conversationId, content).subscribe((message) => {
      expect(message).toEqual(mockData);
    });

    const req = httpMock.expectOne(
      `https://localhost:7178/api/chat/conversations/${conversationId}/messages`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ content, sender: 0 });
    req.flush(mockData);
  });

  it('should rate a message', () => {
    const messageId = 'msg1';
    const rating = 1;

    service.rateMessage(messageId, rating).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(
      `https://localhost:7178/api/chat/messages/${messageId}/rate`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ rating });
    req.flush(null);
  });

  it('should get a conversation', () => {
    const conversationId = '1';
    const mockData: Conversation = {
      id: conversationId,
      createdAt: new Date().toISOString(),
      messages: [],
    };

    service.getConversation(conversationId).subscribe((conversation) => {
      expect(conversation).toEqual(mockData);
    });

    const req = httpMock.expectOne(
      `https://localhost:7178/api/chat/conversations/${conversationId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
