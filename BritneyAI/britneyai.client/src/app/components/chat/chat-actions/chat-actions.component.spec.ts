import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatActionsComponent } from './chat-actions.component';

describe('ChatActionsComponent', () => {
  let component: ChatActionsComponent;
  let fixture: ComponentFixture<ChatActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
