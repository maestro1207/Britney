import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatActionsComponent } from './chat-actions.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('ChatActionsComponent', () => {
  let component: ChatActionsComponent;
  let fixture: ComponentFixture<ChatActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, ChatActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit messageChange event when changed', () => {
    spyOn(component.messageChange, 'emit');
    const newMessage = 'New message';
    component.messageChange.emit(newMessage);
    expect(component.messageChange.emit).toHaveBeenCalledWith(newMessage);
  });

  it('should emit sendMessage event when triggered', () => {
    spyOn(component.sendMessage, 'emit');
    component.sendMessage.emit();
    expect(component.sendMessage.emit).toHaveBeenCalled();
  });

  it('should emit cancelMessage event when triggered', () => {
    spyOn(component.cancelMessage, 'emit');
    component.cancelMessage.emit();
    expect(component.cancelMessage.emit).toHaveBeenCalled();
  });

  it('should emit sendMessage event when click on send-button', () => {
    spyOn(component.sendMessage, 'emit');

    const sendButton = fixture.debugElement.query(
      By.css('[testId="send-button"]')
    );

    sendButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.sendMessage.emit).toHaveBeenCalled();
  });
});
