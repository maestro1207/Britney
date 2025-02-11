import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatNewConversationComponent } from './chat-new-conversation.component';

describe('ChatNewConversationComponent', () => {
  let component: ChatNewConversationComponent;
  let fixture: ComponentFixture<ChatNewConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatNewConversationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatNewConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
